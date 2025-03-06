import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    let posts;
    if (userId) {
      posts = await db.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await db.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error, "GET POSTS");
    return new NextResponse("[GET_POSTS]", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { body } = await request.json();

    const post = await db.post.create({
      data: {
        body,
        userId: currentUser?.id as string,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error, "add POST");
    return new NextResponse("[ADD_POST]", {
      status: 500,
    });
  }
}
