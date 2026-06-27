export async function persistSnapshot(
  snapshot: any,
  save: () => Promise<void>
) {
  if (!snapshot) return;

  await save();
}