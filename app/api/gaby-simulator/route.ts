import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, reviewData } = await req.json();
console.log("REVIEW DATA RECEIVED:", reviewData);
    if (reviewData) {
const prompt = `
You are Gaby, the TradeNestX simulator coach.

The TradeNestX scoring engine already reviewed this trade.

Use ONLY the provided review fields.
Do NOT invent new strengths.
Do NOT invent new weaknesses.
Do NOT create new reasons.
Do NOT change the score.
Do NOT add leverage comments unless they appear in the provided review fields.
For Spot trades, never mention leverage, margin, or exposure.

Trade Data:
${JSON.stringify(reviewData, null, 2)}

Important Display Values:
Trade Type: ${reviewData.tradeType}
Position Size: ${reviewData.positionSizeText}
P/L: ${reviewData.pnlText}
Gross P/L: ${reviewData.grossPnlText}
Fees: ${reviewData.feesText}

Provided Review:
Strength: ${reviewData.strength}
Main Issue: ${reviewData.mainIssue}
Review Point: ${reviewData.reviewPoint}

Write the response in this exact format:

Final Trade Score: ${reviewData.score}/10

Strength:
${reviewData.strength}

Main Issue:
${reviewData.mainIssue}

Review:
${reviewData.reviewPoint}

Rules:
- Maximum 60 words.
- Keep the wording natural.
- Do not suggest profit targets.
- Do not suggest earning a specific dollar amount.
- Focus only on what the trader could control.
- Never tell the trader to reduce fees.
`;

      const completion =
        await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Gaby, the official TradeNestX simulator coach.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return Response.json({
        answer:
          completion.choices[0].message.content ||
          `Final Trade Score: ${reviewData.score}/10`,
      });
    }

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Gaby, the TradeNestX simulator coach. Answer simulator questions only.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      });

    return Response.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      answer:
        "Gaby is having trouble reviewing the simulator right now.",
    });
  }
}