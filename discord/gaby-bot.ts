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

type GabyMessage = {
  role: "user" | "assistant";
  content: string;
};

const conversationMemory = new Map<string, GabyMessage[]>();
const conversationLastActive = new Map<string, number>();
const MEMORY_EXPIRE_MS = 60 * 60 * 1000;


function getConversationKey(message: any) {
  return message.author.id;
}

function getMemory(message: any): GabyMessage[] {
  const key = getConversationKey(message);
  const lastActive = conversationLastActive.get(key);

  if (lastActive && Date.now() - lastActive > MEMORY_EXPIRE_MS) {
    conversationMemory.delete(key);
    conversationLastActive.delete(key);
    return [];
  }

  return conversationMemory.get(key) || ([] as GabyMessage[]);
}

function saveMemory(message: any, userQuestion: string, gabyResponse: string) {
  const key = getConversationKey(message);

  const previous: GabyMessage[] =
  conversationMemory.get(key) || [];

const updated = [
  ...previous,
  { role: "user" as const, content: userQuestion },
  { role: "assistant" as const, content: gabyResponse },
].slice(-6) as GabyMessage[];

  conversationMemory.set(key, updated);
  conversationLastActive.set(key, Date.now());
}

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

Need help? Ask me with \`!gaby your question\``,

    };

return `
${messages[lessonId] || `🎉 Great job completing **${lessonTitle}** on TradeNestX!`}

━━━━━━━━━━━━━━

📚 Lesson ${currentLessonNumber} of ${totalLessons}

📈 Progress: ${progressPercent}%

➡️ Next: ${nextLessonName}

━━━━━━━━━━━━━━

Need help? Ask me with \`!gaby your question\`
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

async function createEducationalExplanation(headline: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
You are Gaby, the TradeNestX educational trading coach.

Explain this real market headline for beginners.

Rules:
- Educational only
- Do not say buy
- Do not say sell
- Do not predict price
- Do not give signals
- Do not give entry or exit levels
- Keep it 2 short sentences
`,
      },
      {
        role: "user",
        content: headline,
      },
    ],
  });

  return (
    completion.choices[0].message.content ||
    "This headline matters because market news can affect sentiment, volume, and volatility. Beginners should focus on understanding the concept, not predicting the next move."
  );
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
  const today = new Date().toDateString();

  const headlineRef = db
    .collection("dailyMarketHeadlines")
    .doc(today);

  const headlineSnap = await headlineRef.get();

  if (headlineSnap.exists) return;

  const headline = await fetchMarketHeadline();

  if (!headline) return;

  const lesson = getRelatedLesson(headline);
  const explanation = await createEducationalExplanation(headline);

const channel = await client.channels.fetch(
  MARKET_HEADLINE_CHANNEL_ID
);

if (!channel || !channel.isTextBased() || !("send" in channel)) return;

await channel.send(`
📰 **Gaby's Market Headline**

${headline}

🎓 **Why it matters:**
${explanation}

📚 **Related Lesson:**
${lesson}

Educational purposes only. TradeNestX does not provide financial advice, investment recommendations, or trading signals.
`);

  await headlineRef.set({
    headline,
    lesson,
    sentAt: new Date().toISOString(),
  });
}

client.once("ready", async () => {
  console.log(`Gaby is online.`);

setInterval(() => {
  const now = Date.now();

  conversationLastActive.forEach((lastActive, key) => {
    if (now - lastActive > MEMORY_EXPIRE_MS) {
      conversationMemory.delete(key);
      conversationLastActive.delete(key);
    }
  });
}, 10 * 60 * 1000);

setInterval(async () => {
  const now = new Date();

  const isNineAM = now.getHours() === 9;
  const isFirstMinute = now.getMinutes() === 0;

if (isNineAM && isFirstMinute) {
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
    `🚀 Welcome ${member.user}, to TradeNestX Community!\n\nI'm Gaby, your AI trading coach. Use \`!gaby help\` to explore beginner trading lessons and commands.`
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
  message.reply(
    "Hi! I'm Gaby, your TradeNestX AI coach. 🚀"
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
if (question.includes("help")) {
  message.reply(
    "Here are Gaby commands:\n\n• !gaby stock\n• !gaby crypto\n• !gaby forex\n• !gaby market\n• !gaby risk\n• !gaby psychology\n• !gaby candlestick\n• !gaby trade plan\n• !gaby support\n• !gaby timeframe\n• !gaby tip\n• !gaby quiz 🚀"
  );
} else if (question.includes("lesson")) {
  message.reply(
    "Today's beginner lesson: Understand what you are buying before you trade. Know the asset, why price moves, and how much risk you are taking. 📚"
 );
 } else if (
  question.includes("risk") ||
  question.includes("loss") ||
  question.includes("stop loss")
) {
  message.reply(
    "Risk management means protecting your account first. Never risk more than you can afford to lose, and always know your exit before entering a trade. 🛡️"
  );
  } else if (
  question.includes("psychology") ||
  question.includes("emotion") ||
  question.includes("fear") ||
  question.includes("greed")
) {
  message.reply(
    "Trading psychology is about controlling emotions. Fear and greed can cause impulsive trades, so discipline and patience are critical. 🧠"
  );
  } else if (
  question.includes("candlestick") ||
  question.includes("candle") ||
  question.includes("chart")
) {
  message.reply(
    "Candlesticks help traders read price movement. Each candle shows open, high, low, and close prices during a timeframe. 🕯️"
  );
  } else if (
  question.includes("motivation") ||
  question.includes("discipline") ||
  question.includes("mindset")
) {
  message.reply(
    "Successful trading is not about getting rich fast. It's about discipline, patience, and consistency over time. 🚀"
  );
  } else if (
  question.includes("trade plan") ||
  question.includes("plan") ||
  question.includes("strategy")
) {
  message.reply(
    "A trade plan helps traders stay disciplined. Before entering a trade, know your entry, stop loss, target, and risk level. 📋"
  );
  } else if (
  question.includes("support") ||
  question.includes("resistance")
) {
  message.reply(
    "Support is an area where buyers may step in. Resistance is an area where sellers may appear. Traders use these levels to plan entries and exits. 📊"
  );
  } else if (
  question.includes("timeframe") ||
  question.includes("1 minute") ||
  question.includes("5 minute") ||
  question.includes("daily")
) {
  message.reply(
    "Trading timeframes help traders analyze the market differently. Lower timeframes move faster, while higher timeframes usually show stronger trends. ⏰"
  );
  } else if (
  question.includes("tip") ||
  question.includes("daily tip")
) {
  const tips = [
    "Protect your capital before chasing profits. 🛡️",
    "Wait for confirmation instead of chasing candles. 📈",
    "One good trade is better than ten emotional trades. 🧠",
    "Risk management matters more than winning every trade. 🚀",
    "Patience is one of the strongest trading skills. ⏳",
  ];

  const randomTip =
    tips[Math.floor(Math.random() * tips.length)];

  message.reply(randomTip);
  } else if (
  question.includes("quiz") ||
  question.includes("question")
) {
  const quizzes = [
    "Quiz: What does a candlestick show? 🕯️",
    "Quiz: Why is risk management important? 🛡️",
    "Quiz: What is support in trading? 📊",
    "Quiz: What emotion can cause impulsive trades? 🧠",
    "Quiz: Why should traders use a stop loss? 🚨",
  ];

  const randomQuiz =
    quizzes[Math.floor(Math.random() * quizzes.length)];

  message.reply(randomQuiz);

} else if (question.includes("stock")) {
 message.reply({
  embeds: [
    {
      title: "📈 Stocks",
      description:
        "A stock is a small piece of ownership in a company.",
      color: 0x22d3ee,
      footer: {
        text: "TradeNestX • Gaby AI Coach",
      },
    },
  ],
});
} else if (question.includes("crypto")) {
  message.reply({
  embeds: [
    {
      title: "₿ Crypto",
      description:
        "Crypto is a digital asset that trades 24/7 and can be highly volatile.",
      color: 0x22d3ee,
      footer: {
        text: "TradeNestX • Gaby AI Coach",
      },
    },
  ],
});
} else if (question.includes("forex")) {
  message.reply(
    "Forex is the exchange of currencies like USD/EUR. 💱"
  );
  } else if (
  question.includes("status") ||
  question.includes("server")
) {
  message.reply(
    "TradeNestX Community is live. Use `!gaby help` to explore lessons, tips, quizzes, and beginner trading guidance. ✅"
  );
  } else if (
  question.includes("progress") ||
  question.includes("improving")
) {
  message.reply(
    "Trading progress takes time. Focus on consistency, discipline, and protecting your capital while learning step by step. 📈"
  );
  } else if (
  question.includes("btc price") ||
  question.includes("bitcoin price")
) {
  message.reply({
    embeds: [
      {
        title: "₿ Bitcoin Market",
        description:
          "Bitcoin is currently one of the most actively traded crypto assets. Always analyze trend, volume, and risk before entering trades.",
        color: 0x22d3ee,
        footer: {
          text: "TradeNestX • Gaby AI Coach",
        },
      },
    ],
  });
  } else if (
  question.includes("market") ||
  question.includes("btc") ||
  question.includes("bitcoin")
) {
  message.reply(
    "The market is always changing. Focus on trend, volume, and risk management before entering trades. 📈"
  );
} else {
  const lowerMessage = question.toLowerCase();

const blockedTopics = [
  "sports",
  "football",
  "basketball",
  "soccer",
  "baseball",
  "tennis",
  "weather",
  "dating",
  "relationship",
  "girlfriend",
  "boyfriend",
  "politics",
  "religion",
  "movie",
  "movies",
  "music",
  "gaming",
  "game",
  "video game",
  "marvel",
  "marvel rivals",
  "celebrity",
  "food",
  "travel",
  "vacation",
  "shopping",
  "fashion",
  "homework",
  "math",
  "science",
  "history",
  "coding",
  "programming",
  "javascript",
  "python",
];

if (blockedTopics.some((topic) => lowerMessage.includes(topic))) {
message.reply(
  "I’m here to help with TradeNestX, trading education, market concepts, and simulator learning only."
);
return;
}
 const completion = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    {
      role: "system",
content: `
You are Gaby, the official TradeNestX AI Coach for Discord.

Your job is to answer market-related questions clearly, naturally, and educationally.

Core behavior:
- Explain the user's question first.
- Do not immediately redirect to TradeNestX.
- Mention TradeNestX only when it naturally helps the user.
- Do not sound salesy, repetitive, or robotic.
- Do not end every answer by recommending TradeNestX.
- Keep answers beginner-friendly and conversational.

TradeNestX Beginner Academy currently teaches these lessons in order:
1. What Are You Buying? — assets, stocks, crypto, why price moves
2. How The Market Works — buyers, sellers, supply, demand, volatility
3. Market vs Limit Orders — order types, execution, price control
4. Protecting Your Capital — risk management, losses, stop losses, discipline
5. Candlestick Basics — open, high, low, close, bullish and bearish candles
6. Trading Timeframes — lower vs higher timeframes, noise, patience
7. Volume Basics — participation, strong volume, weak volume
8. Support & Resistance — key levels, reactions, breakouts
9. Supply & Demand — buying pressure, selling pressure, imbalance zones
10. Chart Patterns — double tops, double bottoms, triangles, head and shoulders
11. Building A Trade Plan — entry, stop loss, target, checklist, risk reward
12. Trading Psychology — fear, greed, FOMO, patience, discipline
13. Essential Trading Terms — spread, liquidity, market cap, trend, breakout, pullback
14. Trader Checkpoint — beginner review quiz

TradeNestX Simulator currently supports:
- Crypto spot trading
- Crypto futures trading
- Longs and shorts
- Leverage
- Liquidation
- Market orders
- Limit orders
- Open positions
- Trade history
- Paper trading only

TradeNestX does not teach yet, but may cover in future advanced lessons:
- RSI
- Moving averages
- MACD
- Bollinger Bands
- VWAP
- Fibonacci
- advanced indicators
- advanced market structure
- liquidity concepts
- breakouts and retests
- advanced futures strategy
- options strategies

If the user asks what a concept is:
- Give a simple beginner explanation in 1-2 sentences.
- Do not mention TradeNestX unless the user asks about lessons or curriculum.
- Stop after answering.

If the user asks whether TradeNestX teaches a topic:
- Answer honestly.
- Explain whether it is currently taught.
- If not, explain where it fits in the learning path.

Lesson recommendation behavior:
- Only recommend a TradeNestX lesson when it naturally helps the user.
- If the user asks what to study next, recommend one specific lesson.
- If the user is confused about risk, recommend Protecting Your Capital.
- If the user is confused about entries, recommend Market vs Limit Orders or Building A Trade Plan.
- If the user is confused about price movement, recommend How The Market Works.
- If the user is confused about volume, recommend Volume Basics.
- If the user is confused about support, resistance, or breakouts, recommend Support & Resistance.
- If the user is confused about supply/demand zones, recommend Supply & Demand.
- If the user is emotional, impatient, or chasing trades, recommend Trading Psychology.
- Keep recommendations short and natural.

You NEVER:
- give buy or sell recommendations
- provide trading signals
- predict prices
- give price targets
- tell users what asset to buy
- give entry or exit levels
- encourage risky leverage or gambling behavior
- recommend outside platforms, courses, Discords, influencers, or brokers

Follow-up behavior:
- If the user asks a follow-up like "why?" or "how does that work?", answer as a continuation of the previous topic when possible.
- Ask a simple follow-up question only when it feels natural.
- Do not force a follow-up every time.

Discord style:

- Most answers should be 1-2 sentences.
- Maximum 50 words.
- Answer the question directly and stop.
- Do not automatically ask follow-up questions.
- Do not add extra explanations unless the user asks.
- Do not sound like a teacher writing an article.
- Sound like a helpful coach chatting in Discord.

Keep answers:
- very short
- direct
- conversational
- educational
`,
    },
    ...(getMemory(message) as GabyMessage[]),
    {
      role: "user",
      content: question,
    },
  ],
});

const response =
  completion.choices[0].message.content || "No response.";

saveMemory(message, question, response);

message.reply(response);
}
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);