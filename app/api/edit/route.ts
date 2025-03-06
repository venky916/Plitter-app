import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";

import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const { name, username, bio, profileImage, coverImage } =
      await request.json();

    if (!name || !username) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "Edit user");
    return new NextResponse("[EDIT_USER]", {
      status: 500,
    });
  }
}
