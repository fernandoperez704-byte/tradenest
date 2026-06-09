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
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Know what you are buying\n• Understand why price moves\n• Never enter without a reason\n\nSimulator challenge: Open the simulator and watch how price moves before placing any trade. 🚀

Need help? Reply with \`!gaby what does buying an asset mean?\``,

    market:
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Buyers push price up\n• Sellers push price down\n• Supply and demand control movement\n\nSimulator challenge: Open the simulator and identify whether buyers or sellers look stronger. 📊`,

    orders:
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Market orders focus on speed\n• Limit orders focus on price control\n• Beginners should understand both before trading\n\nSimulator challenge: Practice one market order and one limit order in the simulator. 🧠`,
 
risk:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Protect capital first
• Never risk money you cannot afford to lose
• Small losses are part of trading
• One trade should never damage your account

Simulator challenge: Open the simulator and practice placing trades with controlled risk instead of focusing on profits.

Need help? Reply with \`!gaby what is risk management?\``,

candlesticks:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Candlesticks tell a story
• Every candle shows open, high, low, and close
• Buyers and sellers leave clues on the chart
• Patterns become easier to spot with practice

Simulator challenge: Open the simulator and identify bullish and bearish candles before placing any trade.

Need help? Reply with \`!gaby what is a candlestick?\``,

timeframes:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Different timeframes tell different stories
• Lower timeframes move faster
• Higher timeframes usually show stronger trends
• Good traders learn to look at the bigger picture

Simulator challenge: Open the simulator and compare the chart on multiple timeframes before making a decision.

Need help? Reply with \`!gaby what timeframe should beginners use?\``,

volume:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Volume shows participation
• Strong moves often have strong volume
• Weak volume can signal weak conviction
• Volume helps confirm price movement

Simulator challenge: Open the simulator and compare price movement with volume before placing a trade.

Need help? Reply with \`!gaby why is volume important?\``,

support:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Support is an area where buyers may step in
• Price often reacts around support levels
• Support is not guaranteed to hold
• Traders use support to help manage risk

Simulator challenge: Open the simulator and identify one support level before placing a trade.

Need help? Reply with \`!gaby what is support?\``,

supplydemand:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Supply and demand drive all markets
• Demand can push prices higher
• Supply can push prices lower
• Traders look for areas where imbalance exists

Simulator challenge: Open the simulator and find an area where buyers or sellers seem strongest.

Need help? Reply with \`!gaby what is supply and demand?\``,

patterns:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Patterns help traders organize information
• No pattern guarantees an outcome
• Confirmation matters more than prediction
• Risk management always comes first

Simulator challenge: Open the simulator and identify one chart pattern before entering a trade.

Need help? Reply with \`!gaby what is a chart pattern?\``,

setups:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Every trade should have a plan
• Know your entry before entering
• Know your stop loss before entering
• Know your target before entering

Simulator challenge: Open the simulator and create a complete trade plan before placing a trade.

Need help? Reply with \`!gaby what is a trade plan?\``,

psychology:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Emotions influence trading decisions
• Fear and greed can create mistakes
• Discipline is more important than excitement
• Consistency beats impulsive decisions

Simulator challenge: Open the simulator and focus on following your plan instead of chasing profits.

Need help? Reply with \`!gaby what is trading psychology?\``,

vocabulary:
  `🎉 Great job completing **${lessonTitle}** on TradeNestX!

Today’s focus:

• Traders use specific terminology
• Understanding the language builds confidence
• Communication improves learning
• Knowledge reduces confusion

Simulator challenge: Open the simulator and identify at least three trading terms you learned this week.

Need help? Reply with \`!gaby explain trading terms\``,

quiz:
  `🎓 Congratulations!

You completed the TradeNestX Beginner Academy.

You now understand:

• Market basics
• Risk management
• Candlesticks
• Volume
• Support & Resistance
• Trading Psychology

━━━━━━━━━━━━━━

🚀 Coming Soon

TradeNestX Advanced Academy

Future topics:

• Leverage & Futures
• Advanced Risk Management
• Market Structure
• Liquidity Concepts
• Breakouts & Retests
• Advanced Trade Planning
• Professional Psychology

━━━━━━━━━━━━━━

Until then:

• Practice in the simulator
• Build consistency
• Protect your capital
• Develop discipline

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

function getLessonChallenge(
  lessonId: string,
  lessonTitle: string
) {
const messages: Record<string, string> = {
  buying:
    `🚀 Simulator challenge for **${lessonTitle}**

Open the TradeNestX simulator. Pick one crypto asset and explain what you are buying before placing any simulated trade.

Need help? Ask me with \`!gaby what does this asset represent?\``,

  market:
    `🚀 Simulator challenge for **${lessonTitle}**

Open the TradeNestX simulator. Watch price movement and decide whether buyers or sellers look stronger before placing a simulated trade.

Need help? Ask me with \`!gaby how do buyers move price?\``,

  orders:
    `🚀 Simulator challenge for **${lessonTitle}**

Place one market order and one limit order in the simulator. Compare the difference between speed and price control.

Need help? Ask me with \`!gaby what is a limit order?\``,

  risk:
    `🚀 Simulator challenge for **${lessonTitle}**

Create a trade idea and decide exactly how much you are willing to risk before entering.

Need help? Ask me with \`!gaby how do traders manage risk?\``,

  candlesticks:
    `🚀 Simulator challenge for **${lessonTitle}**

Find three bullish candles and three bearish candles on the simulator chart. Explain what buyers and sellers were doing.

Need help? Ask me with \`!gaby what does a candlestick show?\``,

  timeframes:
    `🚀 Simulator challenge for **${lessonTitle}**

Compare the same asset on multiple timeframes and identify which timeframe gives the clearest trend.

Need help? Ask me with \`!gaby what timeframe should beginners use?\``,

  volume:
    `🚀 Simulator challenge for **${lessonTitle}**

Find a strong price move and compare it with volume. Decide whether volume confirms the move.

Need help? Ask me with \`!gaby why is volume important?\``,

  support:
    `🚀 Simulator challenge for **${lessonTitle}**

Identify one support level on the chart and observe how price reacts around it.

Need help? Ask me with \`!gaby what is support?\``,

  supplydemand:
    `🚀 Simulator challenge for **${lessonTitle}**

Find an area where buyers or sellers appear strongest and explain why.

Need help? Ask me with \`!gaby what is supply and demand?\``,

  patterns:
    `🚀 Simulator challenge for **${lessonTitle}**

Find one chart pattern on the simulator and describe what it may be signaling.

Need help? Ask me with \`!gaby what is a chart pattern?\``,

  setups:
    `🚀 Simulator challenge for **${lessonTitle}**

Build a complete trade plan including entry, stop loss, target, and risk before entering any trade.

Need help? Ask me with \`!gaby help me build a trade plan\``,

  psychology:
    `🚀 Simulator challenge for **${lessonTitle}**

Place a simulated trade and focus on following your plan without changing it emotionally.

Need help? Ask me with \`!gaby how do traders control emotions?\``,

  vocabulary:
    `🚀 Simulator challenge for **${lessonTitle}**

Identify five trading terms from the academy and explain them in your own words.

Need help? Ask me with \`!gaby explain trading terms\``,

  quiz:
    `🎓 Graduate Challenge

Complete three simulated trades this week.

For each trade record:

• Why you entered
• Where your stop loss was
• What you learned

This is where knowledge becomes experience.

Need help? Ask me with \`!gaby review my trade\``,
};

  return (
    messages[lessonId] ||
    `🚀 Simulator challenge for **${lessonTitle}**

Open the TradeNestX simulator and practice today’s concept safely before tomorrow’s lesson.

Need help? Ask me with \`!gaby your question\`.`
  );
}

client.once("ready", () => {
  console.log(`Gaby is online.`);

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
  challengeStatus: "pending",
followUp1SendAt: getTomorrowAt(9),
followUp2SendAt: getTomorrowAt(13),
challengeSendAt: getTomorrowAt(17),
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
          data.challengeStatus === "pending" &&
          data.challengeSendAt <= now
        ) {
          await user.send(
            getLessonChallenge(data.lessonId, data.lessonTitle)
          );

          await docSnap.ref.update({
            challengeStatus: "sent",
            challengeSentAt: new Date().toISOString(),
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

You represent TradeNestX only.

You ONLY help with:
- beginner trading education
- TradeNestX lessons
- simulator practice
- market basics
- stocks, crypto, forex education
- candlesticks
- chart reading
- volatility
- risk management
- psychology
- order types
- support and resistance
- trading terminology

You NEVER:
- give buy or sell recommendations
- provide trading signals
- predict prices
- tell users what asset to buy
- recommend outside platforms, courses, Discords, influencers, or brokers
- encourage risky leverage or gambling behavior

If users ask where to learn, always recommend TradeNestX lessons first.

When relevant, encourage:
- learning before risking real money
- TradeNestX simulator practice
- protecting capital
- emotional discipline

Do not repeat the same simulator reminder after every answer.

Keep answers:
- short
- beginner friendly
- educational
- natural
- under 4 short sentences
`,
    },
    {
      role: "user",
      content: question,
    },
  ],
});

const response =
  completion.choices[0].message.content;

message.reply(response || "No response.");
}
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);