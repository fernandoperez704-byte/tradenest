export const validCategories = [
  "goals",
  "strategies",
  "recurringIssues",
  "learnedConcepts",
  "preferences",
  "importantContext",
] as const;

export type MemoryCategory = (typeof validCategories)[number];

export type MemoryAction = {
  action: "ADD" | "UPDATE" | "REMOVE" | "NONE";
  category: MemoryCategory | null;
  value: string | null;
  oldValue: string | null;
};

export const noMemory: MemoryAction = {
  action: "NONE",
  category: null,
  value: null,
  oldValue: null,
};