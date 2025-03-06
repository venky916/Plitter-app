import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error, "all users");
    return new NextResponse("[GET_USERS]", {
      status: 500,
    });
  }
}
