export function completeSnapshot<T extends object>(
  snapshot: T | null,
  explanation: string,
  model = "gpt-5.5"
) {
  if (!snapshot) return null;

  return {
    ...snapshot,

    gaby: {
      generated: true,
      generatedAt: new Date().toISOString(),
      model,
      explanation,
    },
  };
}

export function isSnapshotComplete<
  T extends {
    gaby?: {
      generated?: boolean;
      explanation?: string;
    };
  }
>(snapshot: T | null) {
  return Boolean(
    snapshot?.gaby?.generated &&
    snapshot?.gaby?.explanation
  );
}