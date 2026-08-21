import { auth } from "@clerk/nextjs/server";
import { isPaidUser } from "@/lib/subscription";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({
        signedIn: false,
        isPaid: false,
      });
    }

    const isPaid = await isPaidUser(userId);

    return Response.json({
      signedIn: true,
      isPaid,
    });
  } catch (error) {
    console.error("SUBSCRIPTION STATUS ERROR:", error);

    return Response.json(
      { signedIn: false, isPaid: false },
      { status: 500 }
    );
  }
}