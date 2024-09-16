import { useQuery } from "convex/react";

import EmptyState from "./emptyState";
import CreateBoard from "./createBoard";
import NewBoardButton from "./newBoardButton";
import BoardCard, { BoardCardSkeleton } from "./boardCard";

import { api } from "@/../convex/_generated/api";

const BoardList: React.FC<{
  orgId: string;
  searchParams: { keyword?: string; favorites?: string };
}> = ({ orgId, searchParams }) => {
  const data = useQuery(api.boards.get, {
    orgId,
    keyword: searchParams.keyword,
  });

  if (data === undefined)
    return (
      <div>
        <h2 className="text-3xl">
          {searchParams.favorites ? "Favorites Board" : "Team Boards"}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} disabled />
          {[...new Array(4)].map((_, index) => (
            <BoardCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (!data?.length && searchParams.keyword)
    return (
      <EmptyState
        imageURL="/empty-search.svg"
        imageAlt="Empty Search"
        title="No results found!"
        subTitle="Try another keyword"
      />
    );

  if (!data?.length && searchParams.favorites)
    return (
      <EmptyState
        imageURL="/empty-favorites.svg"
        imageAlt="Empty Favorites"
        title="No favotite boards!"
        subTitle="Try mark a board as favorite"
      />
    );

  if (!data?.length)
    return (
      <EmptyState
        imageURL="/note.svg"
        height={110}
        width={110}
        imageAlt="Empty Boards"
        title="Create your first board!"
        subTitle="Start by creating a board for your organization"
      >
        <CreateBoard />
      </EmptyState>
    );

  return (
    <div>
      <h2 className="text-3xl">
        {searchParams.favorites ? "Favorites Board" : "Team Boards"}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageURL={board.imageURL}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
