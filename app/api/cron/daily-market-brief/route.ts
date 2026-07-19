import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import admin from "firebase-admin";

import { getDailyLookBack } from "@/lib/news/getDailyLookBack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COINDESK_RSS_URL =
  "https://www.coindesk.com/arc/outboundfeeds/rss/";

type MarketHeadline = {
  title: string;
  source: string;
  publishedAt: string;
};

type GeneratedHeadlineInsight = {
  title: string;
  gabyInsight: string;
};

type MarketConcept = {
  title: string;
  explanation: string;
};

type GeneratedMarketBrief = {
  headlineInsights: GeneratedHeadlineInsight[];
  breakdown: string;
  concepts: MarketConcept[];
  categories: string[];
};

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    const projectId =
      process.env.FIREBASE_PROJECT_ID;

    const clientEmail =
      process.env.FIREBASE_CLIENT_EMAIL;

    const privateKey =
      process.env.FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      );

    if (
      !projectId ||
      !clientEmail ||
      !privateKey
    ) {
      throw new Error(
        "Firebase Admin environment variables are missing."
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return admin.firestore();
}

function getOpenAIClient() {
  const apiKey =
    process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing."
    );
  }

  return new OpenAI({
    apiKey,
  });
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extractXmlValue(
  item: string,
  tag: string
) {
  const cdataPattern = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
    "i"
  );

  const standardPattern = new RegExp(
    `<${tag}[^>]*>([\\s\\S]*?)</${tag}>`,
    "i"
  );

  const cdataMatch =
    item.match(cdataPattern);

  if (cdataMatch?.[1]) {
    return decodeXml(cdataMatch[1]);
  }

  const standardMatch =
    item.match(standardPattern);

  if (standardMatch?.[1]) {
    return decodeXml(standardMatch[1]);
  }

  return "";
}

async function fetchMarketHeadlines(
  limit = 5
): Promise<MarketHeadline[]> {
  const response = await fetch(
    COINDESK_RSS_URL,
    {
      cache: "no-store",
      headers: {
        "User-Agent":
          "TradeNestX Daily Market Brief",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `CoinDesk RSS request failed with status ${response.status}.`
    );
  }

  const xml = await response.text();

  const items =
    xml.match(/<item[\s\S]*?<\/item>/gi) ??
    [];

  const headlines = items
    .map((item): MarketHeadline | null => {
      const title =
        extractXmlValue(item, "title");

      const url =
        extractXmlValue(item, "link");

      const publishedAt =
        extractXmlValue(item, "pubDate");

if (!title) {
  return null;
}

      const parsedPublishedDate =
        publishedAt
          ? new Date(publishedAt)
          : null;

return {
  title,
  source: "CoinDesk",
  publishedAt:
    parsedPublishedDate &&
    !Number.isNaN(
      parsedPublishedDate.getTime()
    )
      ? parsedPublishedDate.toISOString()
      : "",
};
    })
    .filter(
      (
        headline
      ): headline is MarketHeadline =>
        headline !== null
    );

const uniqueHeadlines =
  headlines.filter(
    (headline, index, all) =>
      all.findIndex(
        (candidate) =>
          candidate.title === headline.title
      ) === index
  );

  return uniqueHeadlines.slice(0, limit);
}

async function createDailyMarketBrief(
  headlines: MarketHeadline[]
): Promise<GeneratedMarketBrief> {
  const openai = getOpenAIClient();

  const headlineList = headlines
    .map(
      (headline, index) =>
        `${index + 1}. ${headline.title}`
    )
    .join("\n");

  const completion =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "daily_market_brief",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,

            properties: {

headlineInsights: {
  type: "array",
  minItems: 1,
  maxItems: 5,

  items: {
    type: "object",
    additionalProperties: false,

    properties: {
      title: {
        type: "string",
      },

      gabyInsight: {
        type: "string",
      },
    },

    required: [
      "title",
      "gabyInsight",
    ],
  },
},

              breakdown: {
                type: "string",
              },

              concepts: {
                type: "array",
                minItems: 3,
                maxItems: 5,

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    title: {
                      type: "string",
                    },

                    explanation: {
                      type: "string",
                    },
                  },

                  required: [
                    "title",
                    "explanation",
                  ],
                },
              },

              categories: {
                type: "array",

                items: {
                  type: "string",
                },
              },
            },

required: [
  "headlineInsights",
  "breakdown",
  "concepts",
  "categories",
],
          },
        },
      },

messages: [
  {
    role: "system",
    content: `
You are Gaby, the TradeNestX educational trading coach.

You are given several real cryptocurrency and financial-market headlines from the same day.

Create:

1. One educational insight for every supplied headline.
2. One combined daily market breakdown connecting the main themes across all headlines.
3. Between 3 and 5 beginner-friendly key concepts.
4. Simple market categories.

Return only valid JSON matching the required schema.

HEADLINE INSIGHT RULES

For every supplied headline, create exactly one matching headlineInsights entry.

Each headlineInsights entry must contain:

- title: Copy the supplied headline title exactly.
- gabyInsight: Explain what the headline means and why it matters in beginner-friendly language.

Each gabyInsight must:

- Be 2 to 3 short sentences.
- Stay under approximately 65 words.
- Use only facts that can reasonably be understood from the supplied headline.
- Never invent article details, market reactions, numbers, causes, quotes, or outcomes.
- Never claim to have read the full article.
- Never copy or closely imitate the publisher's wording beyond the original headline.
- Never predict prices or future market direction.
- Never provide trading signals.
- Never recommend buying or selling.
- Never suggest entries, exits, targets, or stop losses.
- Remain educational and neutral.

COMBINED MARKET BREAKDOWN RULES

- Create one combined breakdown connecting the most important themes across all supplied headlines.
- Do not summarize every headline separately.
- Explain what the headlines collectively show about the current market environment.
- Use only information supported by the supplied headlines.
- Do not invent market facts.
- Do not claim that every headline caused market movement.
- Keep the breakdown between 3 and 5 concise sentences.
- Keep the language beginner-friendly.
- Never predict prices.
- Never provide buy or sell recommendations.
- Never provide trading signals.
- Never recommend entries or exits.

KEY CONCEPT RULES

- Create between 3 and 5 concepts.
- Each concept must have a short title and concise beginner-friendly explanation.
- Concepts should help users understand ideas mentioned across the headlines.
- Do not provide predictions or trading instructions.

CATEGORY RULES

Use simple labels such as:

Bitcoin
Ethereum
Altcoins
ETFs
Institutions
Economy
Security
Regulations
Market Analysis

Engine = Facts.
Gaby = Explains the facts.
`,
  },

        {
          role: "user",
          content: `
Create today's combined TradeNestX market brief from these headlines:

${headlineList}
`,
        },
      ],
    });

  const content =
    completion.choices[0]?.message
      ?.content;

  if (!content) {
    throw new Error(
      "OpenAI did not return a market brief."
    );
  }

  return JSON.parse(
    content
  ) as GeneratedMarketBrief;
}

function isAuthorized(
  request: NextRequest
) {
  const cronSecret =
    process.env.CRON_SECRET;

  /*
    Local development remains usable when
    CRON_SECRET has not been configured yet.
  */
  if (!cronSecret) {
    return (
      process.env.NODE_ENV !==
      "production"
    );
  }

  const authorization =
    request.headers.get(
      "authorization"
    );

  return (
    authorization ===
    `Bearer ${cronSecret}`
  );
}

export async function GET(
  request: NextRequest
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const db = getFirebaseAdmin();

    const now = new Date();

    const dateKey = now
      .toISOString()
      .slice(0, 10);

    const displayDate =
      now.toLocaleDateString(
        "en-US",
        {
          timeZone:
            "America/New_York",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

    const briefRef = db
      .collection(
        "dailyMarketBriefs"
      )
      .doc(dateKey);

const existingSnapshot =
  await briefRef.get();

if (existingSnapshot.exists) {
  const existingBrief =
    existingSnapshot.data();

  const hasCompleteHeadlines =
    Array.isArray(existingBrief?.headlines) &&
    existingBrief.headlines.length > 0 &&
    existingBrief.headlines.every(
      (headline: any) =>
        typeof headline?.title === "string" &&
        typeof headline?.gabyInsight === "string" &&
        headline.gabyInsight.trim().length > 0
    );

const hasLookBack =
  existingBrief?.lookBack != null;

if (
  hasCompleteHeadlines &&
  typeof existingBrief?.breakdown === "string" &&
  hasLookBack
) {
    return NextResponse.json({
      success: true,
      created: false,
      message:
        "Today's market brief already exists.",
      date: dateKey,
    });
  }
}

    const headlines =
      await fetchMarketHeadlines(5);

    if (headlines.length === 0) {
      throw new Error(
        "No CoinDesk headlines were found."
      );
    }

    const generatedBrief =
      await createDailyMarketBrief(
        headlines
      );

const lookBack =
  await getDailyLookBack(now);

const headlinesWithInsights =
  headlines.map((headline) => {
    const matchingInsight =
      generatedBrief.headlineInsights.find(
        (item) =>
          item.title.trim() ===
          headline.title.trim()
      );

    return {
      ...headline,

      gabyInsight:
        matchingInsight?.gabyInsight?.trim() ||
        "This headline highlights a current market development. Traders can use it to understand the broader environment without treating it as a prediction or trading signal.",
    };
  });

    await briefRef.set({
      date: dateKey,
      displayDate,

      headlines: headlinesWithInsights,

      breakdown:
        generatedBrief.breakdown,

      concepts:
        generatedBrief.concepts,

      categories:
        generatedBrief.categories,
        
lookBack,

      source: {
        name: "CoinDesk",
        feedUrl:
          COINDESK_RSS_URL,
      },

createdAt:
  admin.firestore.FieldValue.serverTimestamp(),

discordPostedAt: null,

});

    return NextResponse.json({
      success: true,
      created: true,
      date: dateKey,
      headlineCount:
        headlines.length,
    });
  } catch (error) {
    console.error(
      "Daily market brief cron failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}