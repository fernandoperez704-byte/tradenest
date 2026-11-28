import { adminDb } from "@/lib/firebaseAdmin";
import { filterGabyMemory } from "@/lib/gaby/memory/gabyMemoryFilter";
import {
  validCategories,
  noMemory,
  type MemoryCategory,
  type MemoryAction,
} from "@/lib/gaby/memory/gabyMemoryTypes";

export type GabyLongTermMemory = Record<MemoryCategory, string[]>;

export function containsTemporaryMarketData(value: string): boolean {
  const text = value.toLowerCase();

  const temporaryMarketTerms = [
    "current price",
    "current support",
    "current resistance",
    "nearest support",
    "nearest resistance",
    "next support",
    "next resistance",
    "current rsi",
    "current momentum",
    "current volume",
    "current market direction",
    "current market structure",
    "current pattern",
    "current position",
    "take profit",
    "stop loss price",
    "chart highlight",
  ];

  return temporaryMarketTerms.some((term) => text.includes(term));
}

function normalizeMemory(value: unknown): GabyLongTermMemory {
  const source =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  return Object.fromEntries(
    validCategories.map((category) => {
      const entries = source[category];

      return [
        category,
        Array.isArray(entries)
          ? entries
              .filter(
                (entry): entry is string =>
                  typeof entry === "string" &&
                  entry.trim().length > 0
              )
              .slice(-20)
          : [],
      ];
    })
  ) as GabyLongTermMemory;
}

export async function getGabyLongTermMemory(
  userId: string
): Promise<GabyLongTermMemory> {
  const snapshot = await adminDb
    .collection("gabySimulatorMemory")
    .doc(userId)
    .get();

  return normalizeMemory(
    snapshot.data()?.longTermMemory
  );
}

export async function applyGabyMemoryAction(
  userId: string,
  memoryAction: MemoryAction
): Promise<GabyLongTermMemory> {
  const result = await commitGabyMemoryAction(
    userId,
    memoryAction
  );

  return result.longTermMemory;
}

async function commitGabyMemoryAction(
  userId: string,
  memoryAction: MemoryAction
): Promise<{
  memoryAction: MemoryAction;
  longTermMemory: GabyLongTermMemory;
}> {
  const ref = adminDb
    .collection("gabySimulatorMemory")
    .doc(userId);

  return adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    const memory = normalizeMemory(
      snapshot.data()?.longTermMemory
    );

    const { action, category, value, oldValue } = memoryAction;

    if (
      action === "NONE" ||
      !category ||
      !validCategories.includes(category)
    ) {
      return {
        memoryAction: noMemory,
        longTermMemory: memory,
      };
    }

    if (
      (action === "ADD" || action === "UPDATE") &&
      value &&
      containsTemporaryMarketData(value)
    ) {
      return {
        memoryAction: noMemory,
        longTermMemory: memory,
      };
    }

    const entries = [...memory[category]];

    if (action === "ADD") {
      if (!value || entries.includes(value)) {
        return {
          memoryAction: noMemory,
          longTermMemory: memory,
        };
      }

      entries.push(value);
    } else if (action === "UPDATE") {
      if (!oldValue || !value) {
        return {
          memoryAction: noMemory,
          longTermMemory: memory,
        };
      }

      const index = entries.indexOf(oldValue);

      if (index === -1) {
        return {
          memoryAction: noMemory,
          longTermMemory: memory,
        };
      }

      entries[index] = value;
    } else if (action === "REMOVE") {
      if (!oldValue || !entries.includes(oldValue)) {
        return {
          memoryAction: noMemory,
          longTermMemory: memory,
        };
      }

      memory[category] = entries.filter(
        (entry) => entry !== oldValue
      );
    } else {
      return {
        memoryAction: noMemory,
        longTermMemory: memory,
      };
    }

    if (action !== "REMOVE") {
      memory[category] = [...new Set(entries)].slice(-20);
    }

    transaction.set(
      ref,
      {
        longTermMemory: memory,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return {
      memoryAction,
      longTermMemory: memory,
    };
  });
}

export async function processGabyLongTermMemory(
  userId: string,
  userMessage: string,
  gabyMessage: string
): Promise<{
  memoryAction: MemoryAction;
  longTermMemory: GabyLongTermMemory;
}> {
  const existingMemory = await getGabyLongTermMemory(userId);

  if (!userMessage.trim()) {
    return {
      memoryAction: noMemory,
      longTermMemory: existingMemory,
    };
  }

  const memoryAction = await filterGabyMemory(
    userMessage,
    gabyMessage,
    existingMemory
  );

  return await commitGabyMemoryAction(
    userId,
    memoryAction
  );
}