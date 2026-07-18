import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  Client,
  GatewayIntentBits,
  Partials,
} from "discord.js";

import OpenAI from "openai";
import admin from "firebase-admin";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

const MARKET_HEADLINE_CHANNEL_ID = "1507825415753039922";
const COINDESK_RSS_URL = "https://www.coindesk.com/arc/outboundfeeds/rss/";


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

function getTomorrowAt(hour: number) {
  const date = new Date();

  date.setDate(date.getDate() + 1);
  date.setHours(hour, 0, 0, 0);

  return date.getTime();
}

function getLessonReinforcement(
  lessonId: string,
  lessonTitle: string,
  userId: string
) {

const lessonOrder = [
  { id: "buying", title: "What Are You Buying?" },
  { id: "market", title: "How The Market Works" },
  { id: "orders", title: "Market vs Limit Orders" },
  { id: "risk", title: "Protecting Your Capital" },
  { id: "candlesticks", title: "Candlestick Basics" },
  { id: "timeframes", title: "Trading Timeframes" },
  { id: "volume", title: "Volume Basics" },
  { id: "support", title: "Support & Resistance" },
  { id: "supplydemand", title: "Supply & Demand" },
  { id: "patterns", title: "Chart Patterns" },
  { id: "setups", title: "Building A Trade Plan" },
  { id: "psychology", title: "Trading Psychology" },
  { id: "vocabulary", title: "Essential Trading Terms" },
  { id: "quiz", title: "Trader Checkpoint" },
];

const currentLessonIndex = lessonOrder.findIndex(
  (lesson) => lesson.id === lessonId
);

const currentLessonNumber = currentLessonIndex + 1;

const totalLessons = lessonOrder.length;

const progressPercent = Math.round(
  (currentLessonNumber / totalLessons) * 100
);

const nextLessonName =
  currentLessonIndex + 1 < totalLessons
    ? lessonOrder[currentLessonIndex + 1].title
    : "Beginner Academy Complete";

  const messages: Record<string, string> = {
buying:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned one of the most important first steps in trading:

Understanding what you are actually buying.

Stocks, crypto, forex, and futures all behave differently and carry different risks.

The more you understand the asset, the easier it becomes to understand the risk.

`,

market:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned why markets move.

Price changes because buyers and sellers are constantly competing.

When demand is stronger, price can rise. When selling pressure takes control, price can fall.

Trading takeaway:

Markets are reactions to supply, demand, fear, opportunity, and risk.

`,

orders:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned how traders enter the market.

Market orders focus on speed.

Limit orders focus on price control.

Trading takeaway:

The way you enter a trade matters. Good execution can help reduce emotional decisions and improve trade quality.

`,

risk:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned one of the most important lessons in trading:

Protecting your capital.

Every trader experiences losses, but successful traders keep those losses small and controlled.

Trading takeaway:

The market will always create new opportunities. Protecting your account ensures you are still there when they arrive.

`,

candlesticks:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned the language of price.

Every candlestick tells a story about the battle between buyers and sellers during a specific period of time.

Trading takeaway:

The goal is not to memorize candles. The goal is to understand what market participants were doing.

`,

timeframes:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned that the same market can look different depending on the timeframe.

Lower timeframes often contain more noise while higher timeframes can reveal stronger trends.

Trading takeaway:

Timeframes do not change the market. They change how you see it.

`,

volume:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned why volume matters.

Price shows what happened.

Volume helps show how much participation was behind the move.

Trading takeaway:

Strong price movement supported by strong volume often carries more conviction than price movement alone.

`,

support:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned how traders identify important price levels.

Support is an area where buyers may become active, but support is never guaranteed to hold.

Trading takeaway:

Support is only support until sellers become stronger than buyers.

`,

supplydemand:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned the forces behind every market movement.

When demand is stronger than supply, prices can rise.

When supply is stronger than demand, prices can fall.

Trading takeaway:

Price is the result of buyers and sellers constantly competing for control.

`,

patterns:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned how traders use chart patterns to organize information.

Patterns help identify situations that have appeared before, but they never guarantee an outcome.

Trading takeaway:

Patterns are tools for observation, not prediction.

`,

setups:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned how to build a complete trade plan.

Good traders know their entry, stop loss, target, and risk before entering a trade.

Trading takeaway:

A trade without a plan is a guess. A trade with a plan is a decision.

`,

psychology:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you learned about the mental side of trading.

Fear, greed, impatience, and overconfidence can influence decision making more than any indicator.

Trading takeaway:

Discipline is often more important than finding the perfect setup.

`,

vocabulary:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today you expanded your trading vocabulary.

Understanding trading terms makes it easier to follow lessons, charts, and market discussions.

Trading takeaway:

The better you understand the language of trading, the easier it becomes to understand the market.

`,

quiz:
  `🎓 Congratulations!

You completed the TradeNestX Beginner Academy.

You now have a foundation in:

• Markets
• Risk Management
• Candlesticks
• Volume
• Support & Resistance
• Trading Psychology

Trading takeaway:

Great traders are built through consistent learning, practice, and discipline over time.

Keep learning one lesson at a time, one trade at a time, and one decision at a time.

Need more help? Visit TradeNestX and continue the conversation with Gaby there.`,
};

return `
${messages[lessonId] || `🎉 Great job completing **${lessonTitle}** on TradeNestX!`}

━━━━━━━━━━━━━━

📚 Lesson ${currentLessonNumber} of ${totalLessons}

📈 Progress: ${progressPercent}%

➡️ Next: ${nextLessonName}

━━━━━━━━━━━━━━

💬 Need more help?

Open TradeNestX and continue the conversation with Gaby inside the lesson or simulator for personalized guidance.
`;
}

function getLessonFollowUp1(
  lessonId: string,
  lessonTitle: string
) {
const messages: Record<string, string> = {
  buying:
    `📚 Follow-up for **${lessonTitle}**

Remember: buying an asset means you need to understand what it represents. Stocks represent company ownership. Crypto represents a digital asset. Never trade something you do not understand.

Ask me about this with \`!gaby what is a stock?\``,

  market:
    `📚 Follow-up for **${lessonTitle}**

Markets move because buyers and sellers are constantly competing. If buyers are stronger, price can rise. If sellers are stronger, price can fall.

Ask me about this with \`!gaby why do prices move?\``,

  orders:
    `📚 Follow-up for **${lessonTitle}**

Market orders prioritize speed. Limit orders prioritize price control. Understanding when to use each can help traders execute more effectively.

Ask me about this with \`!gaby what is a limit order?\``,

  risk:
    `📚 Follow-up for **${lessonTitle}**

Most traders fail because they focus on profits before protecting capital. Good risk management helps you stay in the game long enough to learn.

Ask me about this with \`!gaby why is risk management important?\``,

  candlesticks:
    `📚 Follow-up for **${lessonTitle}**

Candlesticks reveal the battle between buyers and sellers. The shape of a candle can provide clues about momentum and market sentiment.

Ask me about this with \`!gaby what does a candlestick show?\``,

  timeframes:
    `📚 Follow-up for **${lessonTitle}**

A trade can look bullish on one timeframe and bearish on another. Always understand the timeframe you are trading.

Ask me about this with \`!gaby what timeframe should beginners use?\``,

volume:
  `📚 Follow-up for **${lessonTitle}**

Volume helps traders measure participation. Strong volume can confirm a move, while weak volume can suggest a lack of conviction.

Ask me about this with \`!gaby why is volume important?\``,

support:
  `📚 Follow-up for **${lessonTitle}**

Support is an area where buyers may become active. Traders watch support levels because price often reacts around them.

Ask me about this with \`!gaby what is support?\``,

supplydemand:
  `📚 Follow-up for **${lessonTitle}**

Markets move because of supply and demand. When demand outweighs supply, prices can rise. When supply outweighs demand, prices can fall.

Ask me about this with \`!gaby what is supply and demand?\``,

patterns:
  `📚 Follow-up for **${lessonTitle}**

Chart patterns help traders organize information, but no pattern guarantees success. Confirmation and risk management are always important.

Ask me about this with \`!gaby what is a chart pattern?\``,

setups:
  `📚 Follow-up for **${lessonTitle}**

A good trade starts with a good plan. Before entering, know your entry, stop loss, target, and risk.

Ask me about this with \`!gaby what is a trade plan?\``,

psychology:
  `📚 Follow-up for **${lessonTitle}**

Fear and greed affect every trader. Learning to control emotions is one of the most valuable trading skills.

Ask me about this with \`!gaby what is trading psychology?\``,

vocabulary:
  `📚 Follow-up for **${lessonTitle}**

Learning trading terminology helps you understand charts, lessons, and market discussions with more confidence.

Ask me about this with \`!gaby explain trading terms?\``,

quiz:
  `📚 Academy Graduate Reminder

Finishing the Beginner Academy is an achievement, but knowledge grows through practice.

Open the simulator, review your lessons, and continue building experience.

Ask me about this with \`!gaby what should i practice next?\``,

};

return (
  messages[lessonId] ||
  `📚 Follow-up for **${lessonTitle}**

Review the main idea from today’s lesson before moving forward.

Ask me about this with \`!gaby your question\`.`
);
}

function getLessonFollowUp2(
  lessonId: string,
  lessonTitle: string
) {

const messages: Record<string, string> = {
  buying:
    `🧠 Second reminder for **${lessonTitle}**

Before entering any trade, ask:
• What am I buying?
• Why is price moving?
• What is my risk?

Ask me about this with \`!gaby what am i buying?\``,

  market:
    `🧠 Second reminder for **${lessonTitle}**

Supply and demand control movement. More demand can push price up. More supply can push price down.

Ask me about this with \`!gaby what is supply and demand?\``,

  orders:
    `🧠 Second reminder for **${lessonTitle}**

Execution matters. Understanding the difference between market and limit orders can help traders stay disciplined.

Ask me about this with \`!gaby when should i use a limit order?\``,

  risk:
    `🧠 Second reminder for **${lessonTitle}**

Every successful trader thinks about risk before reward. Protecting capital allows you to survive long enough to improve.

Ask me about this with \`!gaby how much should i risk?\``,

  candlesticks:
    `🧠 Second reminder for **${lessonTitle}**

Candles tell the story of buyer and seller behavior. Focus on understanding the story, not memorizing patterns.

Ask me about this with \`!gaby how do candlesticks work?\``,

  timeframes:
    `🧠 Second reminder for **${lessonTitle}**

Higher timeframes often provide more reliable information. Lower timeframes move faster and contain more noise.

Ask me about this with \`!gaby why do timeframes matter?\``,

  volume:
    `🧠 Second reminder for **${lessonTitle}**

Volume helps confirm price movement. Strong volume often supports stronger conviction behind a move.

Ask me about this with \`!gaby how does volume work?\``,

  support:
    `🧠 Second reminder for **${lessonTitle}**

Support levels are areas of interest, not guarantees. Always wait for confirmation and manage risk.

Ask me about this with \`!gaby how does support work?\``,

  supplydemand:
    `🧠 Second reminder for **${lessonTitle}**

Supply and demand influence every market. Traders look for areas where one side appears stronger than the other.

Ask me about this with \`!gaby how does supply and demand work?\``,

  patterns:
    `🧠 Second reminder for **${lessonTitle}**

Patterns help organize information, but they do not predict the future. Focus on probabilities and discipline.

Ask me about this with \`!gaby what chart pattern should i learn first?\``,

  setups:
    `🧠 Second reminder for **${lessonTitle}**

Good traders follow a plan. Knowing your entry, stop loss, and target before entering can improve consistency.

Ask me about this with \`!gaby how do i build a trade plan?\``,

  psychology:
    `🧠 Second reminder for **${lessonTitle}**

Emotions can influence every decision. Patience and discipline often matter more than finding the perfect setup.

Ask me about this with \`!gaby how do traders control emotions?\``,

  vocabulary:
    `🧠 Second reminder for **${lessonTitle}**

Learning trading terminology makes it easier to understand lessons, charts, and market discussions.

Ask me about this with \`!gaby explain trading terms?\``,

  quiz:
    `🧠 Academy Graduate Reminder

Consistent practice is what turns knowledge into skill.

Keep reviewing lessons, asking questions, and practicing in the simulator.

Ask me about this with \`!gaby what should i focus on next?\``,
};

  return (
    messages[lessonId] ||
    `🧠 Second reminder for **${lessonTitle}**

Take a few minutes to review the lesson and connect it to what you see on the chart.

Ask me about this with \`!gaby your question\`.`
  );
}

function getLessonInsight(
  lessonId: string,
  lessonTitle: string
) {
const messages: Record<string, string> = {
  buying:
    `🧠 Gaby Insight

Many beginners focus on price before understanding the asset.

Before entering any trade, first ask:

What am I actually buying?

Understanding the asset helps you understand the risk.`,

  market:
    `🧠 Gaby Insight

Markets do not move randomly.

Every price movement comes from buyers and sellers reacting to opportunity, fear, news, or risk.

Price is the result of that battle.`,

  orders:
    `🧠 Gaby Insight

Entering a trade is not only about direction.

How you enter matters too.

Market orders give speed. Limit orders give control.`,

  risk:
    `🧠 Gaby Insight

Many beginners focus on how much they can make.

Experienced traders focus on how much they can lose.

Protecting capital comes first.`,

  candlesticks:
    `🧠 Gaby Insight

A candle is more than a green or red bar.

It shows who controlled the market during that period and how strong that control was.`,

  timeframes:
    `🧠 Gaby Insight

The same market can look different on different timeframes.

Lower timeframes show more noise.

Higher timeframes often show clearer direction.`,

  volume:
    `🧠 Gaby Insight

Price shows what happened.

Volume helps show how much participation was behind the move.

Strong moves usually need strong participation.`,

  support:
    `🧠 Gaby Insight

Support is not a promise that price will bounce.

Support only exists until sellers become stronger than buyers.

That is why risk management matters.`,

  supplydemand:
    `🧠 Gaby Insight

Supply and demand are the forces behind price movement.

When demand is stronger, price can rise.

When supply is stronger, price can fall.`,

  patterns:
    `🧠 Gaby Insight

Chart patterns do not predict the future.

They help traders organize what price is already showing.

Confirmation and risk management still matter.`,

  setups:
    `🧠 Gaby Insight

A trade without a plan is just a guess.

Before entering, know your reason, your risk, and your exit.`,

  psychology:
    `🧠 Gaby Insight

Most trading mistakes are emotional.

Fear exits too early.

Greed holds too long.

Discipline follows the plan.`,

  vocabulary:
    `🧠 Gaby Insight

Trading has its own language.

The more terms you understand, the easier it becomes to follow lessons, charts, and market conversations.`,

  quiz:
    `🧠 Gaby Insight

Finishing the Beginner Academy is not the end.

It is the foundation.

Skill comes from reviewing, asking questions, and practicing safely over time.`,
};

return (
  messages[lessonId] ||
  `🧠 Gaby Insight

Keep learning one concept at a time. Small lessons repeated over time build real understanding.`
);
}

type DailyMarketConcept = {
  title: string;
  explanation: string;
};

type DailyMarketBrief = {
  breakdown: string;
  concepts: DailyMarketConcept[];
  categories: string[];
};

async function fetchMarketHeadline() {
  const response = await fetch(COINDESK_RSS_URL);
  const xml = await response.text();

  const titleMatch = xml.match(
    /<item>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/
  );

  if (!titleMatch) return null;

  return titleMatch[1];
}

function getRelatedLesson(headline: string) {
  const text = headline.toLowerCase();

  if (
    text.includes("etf") ||
    text.includes("inflow") ||
    text.includes("demand")
  ) {
    return "Supply & Demand";
  }

  if (text.includes("volume")) {
    return "Volume Basics";
  }

  if (
    text.includes("volatility") ||
    text.includes("fed") ||
    text.includes("rates")
  ) {
    return "Trading Psychology";
  }

  if (
    text.includes("support") ||
    text.includes("resistance")
  ) {
    return "Support & Resistance";
  }

  return "How The Market Works";
}

async function createDailyMarketBrief(
  headline: string
): Promise<DailyMarketBrief> {
  const completion = await openai.chat.completions.create({
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
            breakdown: {
              type: "string",
            },
            concepts: {
              type: "array",
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

You are given ONE real crypto news headline.

Return ONLY valid JSON.

Rules:

- Explain why the headline matters.
- Educational only.
- Never predict prices.
- Never give buy or sell advice.
- Never give signals.
- Never mention entries or exits.
- Breakdown should be 2-4 short sentences.
- Create 2-4 key concepts.
- Categories should be simple like:
Bitcoin
Ethereum
Altcoins
ETFs
Institutions
Economy
Security
Regulations
Market Analysis
`,
      },
      {
        role: "user",
        content: headline,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("No response returned.");
  }

  return JSON.parse(content);
}

function getDailyTradingInsight() {
  const insights = [
    "A winning trade does not automatically mean it was a good trade. A good trade follows your plan.",
    "Support is not guaranteed to hold. It only matters while buyers are stronger than sellers.",
    "Risk management comes before profit. One bad trade should never damage your account.",
    "Patience is a trading skill. Not every price move deserves your attention.",
    "Volume helps show participation. Price tells what happened, volume helps show conviction.",
    "A trade without a plan is just a guess. Know your reason, risk, and exit before entering.",
    "Fear exits too early. Greed holds too long. Discipline follows the plan.",
  ];

  return insights[Math.floor(Math.random() * insights.length)];
}

async function sendDailyTradingInsight() {
  const today = new Date().toDateString();

  const insightRef = db
    .collection("dailyTradingInsights")
    .doc(today);

  const insightSnap = await insightRef.get();

  if (insightSnap.exists) return;

  const channel = await client.channels.fetch(
    MARKET_HEADLINE_CHANNEL_ID
  );

  if (!channel || !channel.isTextBased() || !("send" in channel)) return;

  const insight = getDailyTradingInsight();

  await channel.send(`
🧠 **Gaby's Daily Trading Insight**

${insight}

Small lessons repeated over time build real understanding.
`);

  await insightRef.set({
    insight,
    sentAt: new Date().toISOString(),
  });
}

async function sendDailyMarketHeadline() {
  const now = new Date();

  const dateKey = now.toISOString().slice(0, 10);

  const displayDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const briefRef = db
    .collection("dailyMarketBriefs")
    .doc(dateKey);

  const briefSnap = await briefRef.get();

  if (briefSnap.exists) return;

  try {
    const headline = await fetchMarketHeadline();

    if (!headline) {
      console.error("No market headline was found.");
      return;
    }

    const lesson = getRelatedLesson(headline);

    const brief = await createDailyMarketBrief(headline);

    const channel = await client.channels.fetch(
      MARKET_HEADLINE_CHANNEL_ID
    );

    if (
      !channel ||
      !channel.isTextBased() ||
      !("send" in channel)
    ) {
      console.error("Market headline channel was not found.");
      return;
    }

    const conceptsText = brief.concepts
      .map(
        (concept) =>
          `**${concept.title}:** ${concept.explanation}`
      )
      .join("\n");

    await channel.send(`
📰 **Gaby's Daily Market Brief**

**${headline}**

💡 **Why it matters**
${brief.breakdown}

📚 **Key Concepts**
${conceptsText}

🎓 **Related Lesson**
${lesson}

Educational purposes only. TradeNestX does not provide financial advice, investment recommendations, or trading signals.
`);

    await briefRef.set({
      date: dateKey,
      displayDate,
      headline,

      breakdown: brief.breakdown,
      concepts: brief.concepts,
      categories: brief.categories,

      lesson,

      source: {
        name: "CoinDesk",
        feedUrl: COINDESK_RSS_URL,
      },

      createdAt:
        admin.firestore.FieldValue.serverTimestamp(),

      sentAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Failed to create daily market brief:",
      error
    );
  }
}

client.once("ready", async () => {
  console.log(`Gaby is online.`);


setInterval(async () => {
  const now = new Date();

  const isNineAM = now.getHours() === 9;
  const isFirstMinute = now.getMinutes() === 0;

if (true) {
  await sendDailyMarketHeadline();
  await sendDailyTradingInsight();
}

}, 60 * 1000);

  setInterval(async () => {
    const snapshot = await db
      .collection("discordLessonQueue")
      .where("status", "==", "pending")
      .limit(5)
      .get();

    snapshot.forEach(async (docSnap) => {
      const data = docSnap.data();

      if (!data.discordLinked || !data.discordUserId) return;

      try {
        const user = await client.users.fetch(data.discordUserId);

const reinforcementMessage = getLessonReinforcement(
  data.lessonId,
  data.lessonTitle,
  data.userId
);

await user.send(reinforcementMessage);

await docSnap.ref.update({
  status: "sent",
  sentAt: new Date().toISOString(),
followUp1Status: "pending",
followUp2Status: "pending",
insightStatus: "pending",
followUp1SendAt: Date.now() + 4 * 60 * 60 * 1000,
followUp2SendAt: Date.now() + 8 * 60 * 60 * 1000,
insightSendAt: Date.now() + 12 * 60 * 60 * 1000,
});
      } catch (error) {
        console.error(error);

        await docSnap.ref.update({
          status: "failed",
          error: String(error),
          failedAt: new Date().toISOString(),
        });
      }
    });
  }, 60 * 1000);

  setInterval(async () => {
    const now = Date.now();

    const snapshot = await db
      .collection("discordLessonQueue")
      .where("status", "==", "sent")
      .limit(10)
      .get();

    snapshot.forEach(async (docSnap) => {
      const data = docSnap.data();

      if (!data.discordLinked || !data.discordUserId) return;

      try {
        const user = await client.users.fetch(data.discordUserId);

        if (
          data.followUp1Status === "pending" &&
          data.followUp1SendAt <= now
        ) {
          await user.send(
            getLessonFollowUp1(data.lessonId, data.lessonTitle)
          );

          await docSnap.ref.update({
            followUp1Status: "sent",
            followUp1SentAt: new Date().toISOString(),
          });
        }

        if (
          data.followUp2Status === "pending" &&
          data.followUp2SendAt <= now
        ) {
          await user.send(
            getLessonFollowUp2(data.lessonId, data.lessonTitle)
          );

          await docSnap.ref.update({
            followUp2Status: "sent",
            followUp2SentAt: new Date().toISOString(),
          });
        }

if (
  data.insightStatus === "pending" &&
  data.insightSendAt <= now
) {
  await user.send(
    getLessonInsight(data.lessonId, data.lessonTitle)
  );

  await docSnap.ref.update({
    insightStatus: "sent",
    insightSentAt: new Date().toISOString(),
    status: "completed",
  });
}
      } catch (error) {
        console.error(error);
      }
    });
  }, 60 * 1000);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    (c) => c.name === "welcome"
  );

  if (!channel || !channel.isTextBased()) return;

channel.send(
  `🚀 Welcome ${member.user}, to the TradeNestX Community!

I'm Gaby, your TradeNestX community companion.

Here's what I can help with:
• 📚 Lesson reinforcement
• 🧠 Trading insights
• 📰 Daily market headlines
• 🔗 Link your TradeNestX account

Use \`!gaby help\` to see the available Discord commands.

For trading questions, lesson explanations, simulator help, and follow-up conversations, visit TradeNestX and chat with Gaby there.`
);

});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith("!gaby")) {
   const question = message.content
  .replace("!gaby", "")
  .trim()
.toLowerCase();

if (!question) {
  await message.reply(
    "👋 Hi! I'm Gaby, your TradeNestX community companion.\n\nUse `!gaby help` to see what I can do."
  );

  return;
}

if (question.startsWith("link ")) {
  const email = question.replace("link ", "").trim();

  if (!email.includes("@")) {
    message.reply(
      "Please use this format: `!gaby link your@email.com`"
    );
    return;
  }

  const snapshot = await db
    .collection("lessonProgress")
    .where("userEmail", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) {
    message.reply(
      "I couldn't find that TradeNestX account yet. Complete one lesson first, then try linking again."
    );
    return;
  }

  const userDoc = snapshot.docs[0];

  await userDoc.ref.update({
    discordUserId: message.author.id,
    discordLinked: true,
    discordLinkedAt: new Date().toISOString(),
  });

  message.reply(
    "✅ Your Discord is now linked to your TradeNestX learning progress. Gaby can now send lesson reinforcement messages."
  );

  return;
}

await message.channel.sendTyping();

if (question === "help") {
  await message.reply(
    [
      "**Gaby Discord Commands**",
      "",
      "• `!gaby link your@email.com` — Link your Discord account",
      "• `!gaby status` — Check TradeNestX Community status",
      "",
      "For trading questions, lesson explanations, simulator help, and follow-up conversations, use Gaby inside the TradeNestX website.",
    ].join("\n")
  );

  return;
}

if (question === "status") {
  await message.reply(
    "✅ TradeNestX Community is online. Lesson reinforcement, follow-up reminders, daily market headlines, and daily trading insights are active."
  );

  return;
}

await message.reply(
  [
    "📚 For trading questions, lesson explanations, simulator help, and follow-up conversations, please use Gaby inside TradeNestX.",
    "",
    "The website version of Gaby remembers your conversation and provides lesson-specific help.",
  ].join("\n")
);

return;

  }
});

client.login(process.env.DISCORD_BOT_TOKEN);