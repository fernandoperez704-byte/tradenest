"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Navbar from "../components/Navbar";
type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};
const sections = [
  {
    title: "Account & Access",
    description:
      "Help with signing in, accessing TradeNestX, account issues, lesson progress, and profile questions.",
    items: [
      [
        "How do I sign in?",
        "Use the Sign In button in the navigation bar. TradeNestX uses Clerk to securely manage your account.",
      ],
      [
        "Are the lessons free?",
        "Yes. Beginner and Advanced Academy lessons are free to access after signing in.",
      ],
      [
        "Why is my lesson progress missing?",
        "Make sure you are signed into the same TradeNestX account you previously used. Lesson progress is connected to your account.",
      ],
    ],
  },
  {
    title: "Billing & Pro",
    description:
      "Learn what Pro includes, how billing works, how to manage your subscription, and what happens after cancellation.",
    items: [
      [
        "What is included with Pro?",
        "TradeNestX Pro includes unlimited Gaby access, saved simulator data, saved trade history and reviews, and Community access.",
      ],
      [
        "How much is TradeNestX Pro?",
        "TradeNestX Pro is $24.99 per month.",
      ],
      [
        "How do I cancel Pro?",
        "Open your profile menu and select Manage Subscription. Stripe will open your secure billing portal where you can cancel.",
      ],
      [
        "Will I lose Pro immediately if I cancel?",
        "No. Your Pro access continues until the end of the billing period you already paid for.",
      ],
    ],
  },
  {
    title: "Simulator",
    description:
      "Get help with the $10,000 practice account, Spot and Futures trading, saved data, resets, positions, orders, and trade history.",
    items: [
      [
        "Why didn't my simulator data save?",
        "Free users can practice normally, but simulator data does not persist after leaving or refreshing. Pro users receive persistent simulator storage.",
      ],
      [
        "How much practice money do I start with?",
        "Every TradeNestX practice account starts with $10,000 in simulated funds.",
      ],
      [
        "Does the simulator use real money?",
        "No. TradeNestX is a paper-trading simulator. Practice balances, trades, profits, and losses are simulated.",
      ],
      [
        "How do I reset my practice account?",
        "Use Reset Practice Account inside the simulator to return your practice account to its starting state.",
      ],
    ],
  },
  {
    title: "Gaby",
    description:
      "Learn how your TradeNestX trading coach works, what Gaby can explain, free usage limits, and what she will not provide.",
    items: [
      [
        "How many free Gaby questions do I get?",
        "Free users receive 5 total Gaby questions. TradeNestX Pro includes unlimited Gaby access.",
      ],
      [
        "Can Gaby tell me what to buy or sell?",
        "No. Gaby is an educational trading coach. She explains market facts, risk, technical concepts, your practice trades, and TradeNestX features without providing buy or sell signals.",
      ],
      [
        "Can Gaby review my practice trades?",
        "Yes. Gaby can use TradeNestX trade-review facts to explain your entries, exits, risk management, and trading development.",
      ],
      [
        "Does Gaby understand Spanish?",
        "Yes. Gaby can help with trading and TradeNestX questions in English or Spanish.",
      ],
    ],
  },
  {
    title: "Learn Academy",
    description:
      "Questions about Beginner Academy, Advanced Academy, lesson access, progression, and learning through TradeNestX.",
    items: [
      [
        "Do I need Pro to use the Academy?",
        "No. TradeNestX lessons are free after signing in.",
      ],
      [
        "What does the Academy teach?",
        "The Academy covers market basics, orders, risk management, candlesticks, timeframes, volume, support and resistance, market structure, momentum, leverage, and more.",
      ],
      [
        "How do I access Advanced Academy?",
        "Advanced Academy is part of the TradeNestX learning path and becomes available after the required Beginner Academy progression.",
      ],
    ],
  },
  {
    title: "Community",
    description:
      "Help with TradeNestX Community access, Discord availability, Pro requirements, and what happens when your subscription ends.",
    items: [
      [
        "How do I access the TradeNestX Community?",
        "Community access is included with TradeNestX Pro. Once Pro is active, use the Community button in the navigation bar.",
      ],
      [
        "Is Community access included with Free?",
        "No. TradeNestX Community access is a Pro feature.",
      ],
      [
        "What happens to Community access if I cancel?",
        "You keep Community access through the remainder of your paid billing period. It ends when your Pro access expires.",
      ],
    ],
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState<string | null>(null);
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
const [conversationHistory, setConversationHistory] = useState<
  ConversationMessage[]
>([]);

const { user } = useUser();
const [isPaid, setIsPaid] = useState(false);
const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);
const [memoryLoaded, setMemoryLoaded] = useState(false);

useEffect(() => {
  if (!user?.id) {
    setIsPaid(false);
    setSubscriptionLoaded(true);
    return;
  }

  fetch("/api/subscription/status")
    .then((res) => res.json())
    .then((data) => setIsPaid(Boolean(data.isPaid)))
    .catch(() => setIsPaid(false))
    .finally(() => setSubscriptionLoaded(true));
}, [user?.id]);

useEffect(() => {
  if (!subscriptionLoaded) return;

  if (!user?.id || !isPaid) {
    setConversationHistory([]);
    setMemoryLoaded(true);
    return;
  }

  getDoc(doc(db, "gabySimulatorMemory", user.id))
    .then((snap) => {
      const memory = snap.data();

      const history: ConversationMessage[] = Array.isArray(
        memory?.conversationHistory
      )
        ? memory.conversationHistory.slice(-12)
        : [];

      setConversationHistory(history);


    })
    .finally(() => setMemoryLoaded(true));
}, [user?.id, isPaid, subscriptionLoaded]);

useEffect(() => {
  if (
    !user?.id ||
    !isPaid ||
    !memoryLoaded ||
    conversationHistory.length === 0
  ) {
    return;
  }

  setDoc(
    doc(db, "gabySimulatorMemory", user.id),
    {
      conversationHistory: conversationHistory.slice(-12),
    },
    { merge: true }
  );
}, [user?.id, isPaid, memoryLoaded, conversationHistory]);

  async function askGaby(customQuestion?: string) {
    const finalQuestion = (customQuestion || question).trim();
    if (!finalQuestion || loading) return;

    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch("/api/gaby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  message: finalQuestion,
  lesson: "TradeNestX Support",
  context: "SUPPORT",
 conversationHistory: isPaid
  ? conversationHistory.slice(-8)
  : [],
}),
      });

const data = await res.json();

const gabyAnswer =
  data.answer || "Gaby is having trouble responding right now.";

setAnswer(gabyAnswer);


if (isPaid) {
  setConversationHistory((prev) => {
    const updated: ConversationMessage[] = [
      ...prev,
      { role: "user", content: finalQuestion },
      { role: "assistant", content: gabyAnswer },
    ];

    return updated.slice(-12);
  });
}

} catch {
  setAnswer("Gaby is having trouble responding right now.");
} finally {
  setLoading(false);
}
}      

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-black md:text-5xl">
              TradeNest<span className="text-cyan-400">X</span> Support
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-400">
              Get instant answers about your account, TradeNestX Pro,
              billing, Gaby, the simulator, lessons, and Community access.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-cyan-400/30 bg-[#020617] p-5 md:p-7">
            <div>
              <p className="text-xl font-black text-cyan-300">
                Ask Gaby
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Can’t find your answer below? Ask Gaby about any TradeNestX
                feature, account question, billing question, or platform issue.
              </p>

{subscriptionLoaded && !isPaid && (
  <p className="mt-2 text-xs text-zinc-500">
    Support Gaby is free and unlimited. Free questions are answered
    individually, so include the relevant details in each question.
    Pro includes conversation memory for follow-up questions.
  </p>
)}

            </div>

{(answer || loading) && (
  <div className="mt-5 rounded-2xl border border-white/10 bg-[#0f172a] p-4">
    <p className="whitespace-pre-line text-sm leading-6 text-zinc-200">
      {loading ? "Gaby is helping..." : answer}
    </p>


  </div>
)}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askGaby();
                }}
                placeholder="Ask Gaby a support question..."
                className="h-12 flex-1 rounded-xl border border-zinc-800 bg-[#111827] px-4 text-sm text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={() => askGaby()}
                disabled={loading}
                className="h-12 rounded-xl bg-cyan-400 px-6 text-sm font-black text-black disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Ask Gaby"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/10 bg-[#0f172a] p-5"
              >
                <h2 className="text-xl font-black text-white">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {section.description}
                </p>

                <div className="mt-4 space-y-2">
                  {section.items.map(([question, answer]) => {
                    const key = `${section.title}-${question}`;

                    return (
                      <div key={key}>
                        <button
                          onClick={() =>
                            setOpen(open === key ? null : key)
                          }
                          className="flex w-full items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-[#111827] px-4 py-3 text-left text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          <span>{question}</span>
                          <span>{open === key ? "−" : "+"}</span>
                        </button>

                        {open === key && (
                          <p className="px-4 py-3 text-sm leading-6 text-zinc-400">
                            {answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-6 text-center">
            <h2 className="text-xl font-black">
              Still need help?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              If Gaby or the help center can’t resolve your issue, contact
              TradeNestX Support and include a short description of what
              happened.
            </p>

            <a
              href="mailto:support@tradenestxacademy.com?subject=TradeNestX Support Request"
              className="mt-4 inline-block font-black text-cyan-400 hover:text-cyan-300"
            >
              support@tradenestxacademy.com
            </a>

            <p className="mt-2 text-xs text-zinc-500">
              Typical response time: 24–48 hours.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}