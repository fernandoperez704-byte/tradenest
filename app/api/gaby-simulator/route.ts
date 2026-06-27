import OpenAI from "openai";
import { buildTraderDevelopmentReport } from "@/lib/traderDevelopment/report";
import { TRADE_REVIEW_PROMPT } from "@/lib/gaby/prompts/tradeReviewPrompt";
import { SIMULATOR_PROMPT } from "@/lib/gaby/prompts/simulatorPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      question,
      simulatorContext,
      lastReviewData,
      conversationHistory,
      lastReferencedLevel,
      lastTopic,
    } = await req.json();

    const normalizedQuestion = question?.trim().toLowerCase();

    const acknowledgementReplies: Record<string, string> = {
      ok: "Great. What would you like to explore next?",
      okay: "Great. What would you like to explore next?",
      yes: "Perfect.",
      yep: "Perfect.",
      yup: "Perfect.",
      cool: "Glad that helped.",
      nice: "Happy to help.",
      "got it": "Perfect.",
      understood: "Excellent.",
      "makes sense": "I'm glad it makes sense.",
      thanks: "You're welcome!",
      "thank you": "You're very welcome!",
      ty: "You're welcome!",
      thx: "You're welcome!",
      hi: "Hi! What can I help you understand today?",
      hello: "Hello! What would you like to explore today?",
      hey: "Hey! What can I help you understand today?",
      "good morning": "Good morning! Ready to learn something new?",
      "good afternoon": "Good afternoon! What can I help you with today?",
      "good evening": "Good evening! What would you like to discuss?",
      bye: "Take care! Keep practicing, and I'll be here whenever you're ready.",
      goodbye: "Take care! See you next time.",
      "see you": "See you next time!",
      "talk later": "Sounds good. I'll be here when you're back.",
      "good night": "Good night! See you soon.",
    };

    const acknowledgementReply =
      acknowledgementReplies[normalizedQuestion];

    if (acknowledgementReply) {
      return Response.json({
        answer: acknowledgementReply,
      });
    }

    const {
      conversationIntent,
      conversationSubject,
      conversationState,
      marketAnalysisSummary,
      ...marketFacts
    } = simulatorContext || {};

    const traderDevelopmentReport =
      simulatorContext?.userId
        ? await buildTraderDevelopmentReport(simulatorContext.userId)
        : null;

    const marketAnalysisQuestions = [
      "what do you think about btc",
      "what do you think of btc",
      "what do you think about the market",
      "what do you think about the market condition",
      "how does btc look",
      "how does the market look",
      "market condition",
      "analyze btc",
      "analysis btc",
    ];

    const isDirectMarketAnalysisQuestion =
      marketAnalysisQuestions.some((phrase) =>
        normalizedQuestion.includes(phrase)
      );

    if (
      conversationIntent === "MARKET_ANALYSIS" &&
      marketAnalysisSummary &&
      isDirectMarketAnalysisQuestion
    ) {
      return Response.json({
        answer: marketAnalysisSummary,
      });
    }

    const systemPrompt =
      conversationIntent === "TRADE_REVIEW" && lastReviewData
        ? TRADE_REVIEW_PROMPT
        : SIMULATOR_PROMPT;

    const userPrompt = `
User Question:
${question}

Conversation State:

Intent:
${conversationIntent || "NONE"}

Subject:
${conversationSubject || "NONE"}

State:
${JSON.stringify(conversationState || {}, null, 2)}

Conversation Instruction:

If the conversation subject exists, remain on that subject until the user clearly changes topics.

Treat the conversation state as the highest-priority context for follow-up questions.

Recent Conversation:
${conversationHistory ? JSON.stringify(conversationHistory, null, 2) : "NONE"}

Market Analysis Summary:
${marketAnalysisSummary || "NONE"}

Simulator Facts:
${JSON.stringify(marketFacts, null, 2)}

Latest Reviewed Trade Facts:
${lastReviewData ? JSON.stringify(lastReviewData, null, 2) : "NONE"}

Trader Development Report:
${
  traderDevelopmentReport?.developmentReport
    ? JSON.stringify(traderDevelopmentReport.developmentReport, null, 2)
    : "NONE"
}

Trader Progress Report:
${
  traderDevelopmentReport?.progressReport
    ? JSON.stringify(traderDevelopmentReport.progressReport, null, 2)
    : "NONE"
}

Trader Profile Report:
${
  traderDevelopmentReport?.profileReport
    ? JSON.stringify(traderDevelopmentReport.profileReport, null, 2)
    : "NONE"
}

Last Referenced Level:
${lastReferencedLevel ? JSON.stringify(lastReferencedLevel, null, 2) : "NONE"}

Last Topic:
${lastTopic || "NONE"}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return Response.json({
      answer:
        completion.choices[0].message.content ||
        "Gaby could not respond right now.",
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      answer:
        "Gaby is having trouble reviewing the simulator right now.",
    });
  }
}