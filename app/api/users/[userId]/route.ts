import { db } from "@/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    if (!userId) {
      return new NextResponse("User ID missing");
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await db.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET_USERS]", {
      status: 500,
    });
  }
}
