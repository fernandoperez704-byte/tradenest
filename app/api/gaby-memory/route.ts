import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const validCategories = [
  "goals",
  "strategies",
  "recurringIssues",
  "learnedConcepts",
  "preferences",
  "importantContext",
] as const;

type MemoryCategory = (typeof validCategories)[number];

type MemoryAction = {
  action: "ADD" | "UPDATE" | "REMOVE" | "NONE";
  category: MemoryCategory | null;
  value: string | null;
  oldValue: string | null;
};

const noMemory: MemoryAction = {
  action: "NONE",
  category: null,
  value: null,
  oldValue: null,
};

function cleanString(value: unknown) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();

  if (!cleaned) return null;

  return cleaned.slice(0, 240);
}

function isValidCategory(value: unknown): value is MemoryCategory {
  return (
    typeof value === "string" &&
    validCategories.includes(value as MemoryCategory)
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userMessage =
      typeof body?.userMessage === "string"
        ? body.userMessage.trim()
        : "";

    const gabyMessage =
      typeof body?.gabyMessage === "string"
        ? body.gabyMessage.trim()
        : "";

    const longTermMemory =
      body?.longTermMemory &&
      typeof body.longTermMemory === "object"
        ? body.longTermMemory
        : {};

    if (!userMessage) {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5.6-luna",
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
You are the long-term memory filter for Gaby, the TradeNestX trading coach.

Your job is NOT to answer the user.
Your only job is to decide whether ONE durable user-specific fact should be added, updated, removed, or ignored.

Be conservative.
When uncertain, return NONE.
It is better to remember nothing than to save incorrect or temporary information.

ALLOWED MEMORY CATEGORIES:

goals
- Durable trading or learning goals explicitly stated by the user.
- Example: "I want to improve my entries."

strategies
- Trading strategies or approaches the user explicitly says they use, practice, or are learning.
- Example: "I am practicing breakout retests."

recurringIssues
- Trading or learning problems the user explicitly says they struggle with.
- This includes difficulty understanding trading concepts.
- Example: "I have trouble identifying support and resistance."
- Example: "I keep entering trades too early."

learnedConcepts
- Trading concepts the user explicitly indicates they now understand or have learned.
- Example: "I understand support and resistance better now."

preferences
- Durable preferences about how Gaby should teach, explain, coach, or interact.
- Example: "Explain things to me with simple examples."

importantContext
- Durable trading-related context explicitly stated by the user that would materially help future coaching and does not belong in another category.

NEVER SAVE:

- Current or live prices.
- Current support prices.
- Current resistance prices.
- Nearest or next support/resistance levels.
- Current RSI values.
- Current moving-average values.
- Current momentum.
- Current volume.
- Current market direction.
- Current market structure.
- Current chart patterns.
- Current chart highlights.
- Current positions.
- Current entry or exit prices.
- Current stop-loss prices.
- Current take-profit prices.
- Current liquidation prices.
- Temporary market conditions.
- One-time market observations.
- Predictions.
- Signal requests.
- Greetings.
- Thanks.
- Acknowledgements.
- Casual conversation.
- Random questions.
- Questions asking where support or resistance is.
- Facts Gaby said about the user unless the user explicitly stated or confirmed them.
- Personality assumptions.
- Psychological diagnoses or inferred personality traits.
- Performance statistics that TradeNestX can calculate from trade history.
- Win rate, PnL, number of trades, entry scores, exit scores, risk scores, or other deterministic Trader Development facts.
- Anything inferred only from one trade.
- Anything that is not useful in a future conversation.

IMPORTANT DISTINCTION:

"I have trouble understanding support."
This IS durable user-specific learning context.
ADD it to recurringIssues.

"Where is support?"
This is a market question.
Return NONE.

"Support is $95,000."
This is temporary market information.
Return NONE.

"I keep confusing support and resistance."
This IS a recurring learning problem.
ADD it to recurringIssues.

"BTC looks bullish right now."
This is temporary market information.
Return NONE.

"I want to get better at identifying market structure."
This is a durable goal.
ADD it to goals.

UPDATES AND REMOVALS:

Use the provided existing memory.

If the user clearly corrects or replaces an existing memory, return UPDATE.

Example:
Existing:
"I am practicing breakout retests."

User:
"I stopped practicing breakout retests. I'm practicing pullbacks now."

Return UPDATE with:
oldValue = the EXACT existing memory string being replaced.
value = the new durable memory.

If the user clearly says an existing memory is no longer true and gives no replacement, return REMOVE.

Example:
Existing:
"I struggle with support and resistance."

User:
"I don't struggle with support and resistance anymore."

Return REMOVE with:
oldValue = the EXACT existing memory string.

Do not remove or update memories merely because they were not mentioned.

GABY'S RESPONSE:

Gaby's response is provided only as conversational context.
Do NOT create memory from something Gaby said unless the user's own message explicitly stated or confirmed it.

ONE ACTION MAXIMUM:

Return at most ONE memory action for each conversation turn.
Choose the single most useful durable fact.
If nothing clearly qualifies, return NONE.

OUTPUT:

Return JSON only in exactly this structure:

{
  "action": "ADD" | "UPDATE" | "REMOVE" | "NONE",
  "category": "goals" | "strategies" | "recurringIssues" | "learnedConcepts" | "preferences" | "importantContext" | null,
  "value": string | null,
  "oldValue": string | null
}

For ADD:
- category must be set.
- value must contain a short standalone durable memory.
- oldValue must be null.

For UPDATE:
- category must be set.
- oldValue must EXACTLY match one existing memory.
- value must contain the replacement.

For REMOVE:
- category must be set.
- oldValue must EXACTLY match one existing memory.
- value must be null.

For NONE:
- category, value, and oldValue must all be null.
          `.trim(),
        },
        {
          role: "user",
          content: JSON.stringify({
            userMessage,
            gabyMessage,
            existingLongTermMemory: longTermMemory,
          }),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    let parsed: any;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    const action = parsed?.action;

    if (
      action !== "ADD" &&
      action !== "UPDATE" &&
      action !== "REMOVE"
    ) {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    if (!isValidCategory(parsed?.category)) {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    const value = cleanString(parsed?.value);
    const oldValue = cleanString(parsed?.oldValue);

    if (action === "ADD") {
      if (!value) {
        return NextResponse.json({
          memoryAction: noMemory,
        });
      }

      return NextResponse.json({
        memoryAction: {
          action: "ADD",
          category: parsed.category,
          value,
          oldValue: null,
        },
      });
    }

    const existingCategory = Array.isArray(
      longTermMemory?.[parsed.category]
    )
      ? longTermMemory[parsed.category]
      : [];

    if (!oldValue || !existingCategory.includes(oldValue)) {
      return NextResponse.json({
        memoryAction: noMemory,
      });
    }

    if (action === "UPDATE") {
      if (!value) {
        return NextResponse.json({
          memoryAction: noMemory,
        });
      }

      return NextResponse.json({
        memoryAction: {
          action: "UPDATE",
          category: parsed.category,
          value,
          oldValue,
        },
      });
    }

    return NextResponse.json({
      memoryAction: {
        action: "REMOVE",
        category: parsed.category,
        value: null,
        oldValue,
      },
    });
  } catch (error) {
    console.error("Gaby memory route failed:", error);

    return NextResponse.json({
      memoryAction: noMemory,
    });
  }
}