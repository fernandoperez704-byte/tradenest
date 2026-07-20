import { adminDb } from "../lib/firebaseAdmin";

import {
  cryptoHistoryEvents,
} from "../lib/news/data/cryptoHistory";

async function seedCryptoHistory() {
  console.log(
    `Preparing to seed ${cryptoHistoryEvents.length} crypto history events.`
  );

  const batch = adminDb.batch();

  for (const event of cryptoHistoryEvents) {
    const documentRef = adminDb
      .collection("cryptoHistory")
      .doc(event.id);

    const {
      id,
      ...eventData
    } = event;

    batch.set(
      documentRef,
      eventData,
      {
        merge: true,
      }
    );
  }

  await batch.commit();

  console.log(
    `Successfully seeded ${cryptoHistoryEvents.length} crypto history events.`
  );
}

seedCryptoHistory()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "Failed to seed crypto history:",
      error
    );

    process.exit(1);
  });