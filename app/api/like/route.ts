import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 }); // ✅ Fixed error message
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (!updatedLikedIds.includes(currentUser?.id as string)) {
      updatedLikedIds.push(currentUser?.id as string);
    }

    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await db.notification.create({
          data: {
            body: "Someone liked your tweet!",
            userId: post?.userId,
          },
        });
        await db.user.update({
          where: {
            id: post?.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log("NOTIFICATION_ERROR", error);
    }

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error, "POST LIKE ERROR");
    return new NextResponse("[POST_LIKE_ERROR]", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    // ✅ Fix: Ensure filter() updates the array
    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    // ✅ Fix: Update the correct table (`db.post.update`)
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error, "POST unLike ERROR");
    return new NextResponse("[POst_DELETE]", { status: 500 });
  }
}
