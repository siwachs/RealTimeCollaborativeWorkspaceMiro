import { NextRequest, NextResponse } from "next/server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/../convex/_generated/api";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const authorization = auth();
    const user = await currentUser();
    if (!authorization || !user)
      return NextResponse.json(
        { error: true, errorMessage: "Unauthorized" },
        { status: 401 },
      );

    const { room } = await req.json();
    const board = await convex.query(api.board.get, { id: room });

    if (board?.orgId !== authorization.orgId)
      return NextResponse.json(
        { error: true, errorMessage: "403 forbidden" },
        { status: 403 },
      );

    const userInfo = {
      name: user?.firstName ?? "Unknown",
      imageURL: user.imageUrl,
    };
    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (room) session.allow(room, session.FULL_ACCESS);

    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        errorMessage: error.message,
      },
      { status: 500 },
    );
  }
}
