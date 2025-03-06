import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { body } = await req.json();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    if (!postId) {
      return new NextResponse("Post id Missing");
    }
    const comment = await db.comment.create({
      data: {
        body,
        userId: currentUser?.id as string,
        postId,
      },
    });

    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await db.notification.create({
          data: {
            body: "Someone replied to your tweet!",
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

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error, "Comment");
    return new NextResponse("[POST_COMMENT]", {
      status: 500,
    });
  }
}
