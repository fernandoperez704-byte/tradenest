import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  Client,
  GatewayIntentBits,
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
    GatewayIntentBits.MessageContent,
  ],
});

function getLessonReinforcement(lessonId: string, lessonTitle: string) {
  const messages: Record<string, string> = {
    buying:
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Know what you are buying\n• Understand why price moves\n• Never enter without a reason\n\nSimulator challenge: Open the simulator and watch how price moves before placing any trade. 🚀

Need help? Reply with \`!gaby what does buying an asset mean?\``,

    market:
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Buyers push price up\n• Sellers push price down\n• Supply and demand control movement\n\nSimulator challenge: Open the simulator and identify whether buyers or sellers look stronger. 📊`,

    orders:
      `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nToday’s focus:\n• Market orders focus on speed\n• Limit orders focus on price control\n• Beginners should understand both before trading\n\nSimulator challenge: Practice one market order and one limit order in the simulator. 🧠`,
  };

  return (
    messages[lessonId] ||
    `🎉 Great job completing **${lessonTitle}** on TradeNestX!\n\nReview today’s lesson, ask Gaby questions in Discord, and practice safely in the simulator. Tomorrow, your next lesson unlocks. 🚀`
  );
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
  data.lessonTitle
);

await user.send(reinforcementMessage);

await docSnap.ref.update({
  status: "sent",
  sentAt: new Date().toISOString(),
  followUp1Status: "pending",
  followUp2Status: "pending",
  challengeStatus: "pending",
followUp1SendAt: Date.now() + 2 * 60 * 60 * 1000,
followUp2SendAt: Date.now() + 4 * 60 * 60 * 1000,
challengeSendAt: Date.now() + 6 * 60 * 60 * 1000,
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