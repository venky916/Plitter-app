import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params; // Get userId from dynamic URL parameter

    if (!userId) {
      return new NextResponse("User ID missing", { status: 400 });
    }

    // Fetch notifications based on userId
    const notifications = await db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Update user to indicate no notifications
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    // Return the notifications as a JSON response
    return NextResponse.json(notifications);
  } catch (error) {
    console.log("Notification Error:", error);
    return new NextResponse("[GET_NOTIFICATIONS]", { status: 500 });
  }
}
