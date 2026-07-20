import { adminDb } from "../lib/firebaseAdmin";

type CryptoHistorySeedEvent = {
  id: string;
  month: number;
  day: number;
  year: number;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  sources: {
    name: string;
    url: string;
  }[];
  verified: boolean;
  status: "PUBLISHED";
};

const cryptoHistoryEvents: CryptoHistorySeedEvent[] = [
  {
    id: "bitcoin-pizza-day",
    month: 5,
    day: 22,
    year: 2010,
    title: "Bitcoin Pizza Day",
    whatHappened:
      "A Bitcoin user paid 10,000 BTC for two pizzas in one of the earliest widely recognized purchases of physical goods using Bitcoin.",
    whyItMatters:
      "The transaction demonstrated that Bitcoin could function as a medium of exchange rather than existing only as an experimental digital asset.",
    sources: [],
    verified: true,
    status: "PUBLISHED",
  },
];

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