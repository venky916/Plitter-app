import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    try {
      await db.notification.create({
        data: {
          body: "Someone Followed you",
          userId,
        },
      });
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log("Notification_Error_FOLLOW", error);
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "POST FOLLOW ERROR");
    return new NextResponse("[FOLLOW_POST]", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );
    const updatedUser = await db.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "POST FOLLOW ERROR");
    return new NextResponse("[FOLLOW_POST]", {
      status: 500,
    });
  }
}
