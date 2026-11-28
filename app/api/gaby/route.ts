import { POST as centralGabyPOST } from "../gaby-simulator/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return await centralGabyPOST(
      new Request(req.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          context: body?.context === "SUPPORT" ? "SUPPORT" : "LEARN",
        }),
      })
    );
  } catch (error) {
    console.error("GABY API ERROR:", error);

    return Response.json({
      answer: "Gaby is having trouble responding right now.",
    });
  }
}