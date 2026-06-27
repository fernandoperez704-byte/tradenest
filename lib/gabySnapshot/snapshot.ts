export function completeSnapshot(
  snapshot: any,
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

export function isSnapshotComplete(snapshot: any) {
  return Boolean(
    snapshot?.gaby?.generated &&
    snapshot?.gaby?.explanation
  );
}