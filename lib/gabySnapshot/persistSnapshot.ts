export async function persistSnapshot<T>(
  snapshot: T | null,
  save: () => Promise<void>
) {
  if (!snapshot) return;

  await save();
}