import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      postId: string;
    };
  }
) {
  try {
    const { postId } = params;

    if (!postId) {
      return new NextResponse("Post id is missing");
    }

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("getPostId", error);
    return new NextResponse("GET BY POSTiD", { status: 500 });
  }
}
