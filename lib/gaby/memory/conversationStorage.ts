
type GabyConversation = {
  userId: string;
  question: string;
  answer: string;
  topic?: string | null;
};

export type GabySavedConversation = {
  question: string;
  answer: string;
  topic: string | null;
  createdAt: string | null;
};

export async function saveGabyConversation({
  userId,
  question,
  answer,
  topic = null,
}: GabyConversation): Promise<void> {
  if (!userId || !question.trim() || !answer.trim()) return;

  const response = await fetch("/api/gaby-memory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "SAVE_CONVERSATION",
      question: question.trim(),
      answer: answer.trim(),
      topic,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save Gaby conversation");
  }
}

export async function getGabyConversations(
  startDate: Date,
  endDate: Date
): Promise<GabySavedConversation[]> {
  const response = await fetch("/api/gaby-memory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "GET_CONVERSATIONS",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve Gaby conversations");
  }

  const data = await response.json();

  return data.conversations;
}
