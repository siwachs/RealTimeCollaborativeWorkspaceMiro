import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    keyword: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const title = args.keyword as string;
    const favorites = args.favorites as string;
    let boards = [];

    if (favorites === "true") {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("orgId", args.orgId).eq("userId", identity.subject),
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((favoriteBoard) => favoriteBoard.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavoritesRelation = boards.map(async (board) => {
      const favorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id),
        )
        .unique();

      return { ...board, isFavorite: !!favorite };
    });

    const boardsWithFavoritesBoolean = await Promise.all(
      boardsWithFavoritesRelation,
    );

    return boardsWithFavoritesBoolean;
  },
});
