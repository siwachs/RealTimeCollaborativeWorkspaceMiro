import { Button } from "@/components/ui/button";
import EmptyState from "./emptyState";

const BoardList: React.FC<{
  orgId: string;
  searchParams: { keyword?: string; favorites?: string };
}> = ({ orgId, searchParams }) => {
  const data = []; //API call to board fetch.

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
        <div className="mt-6">
          <Button size="lg">Create Board</Button>
        </div>
      </EmptyState>
    );

  return <div>BoardList:React.FC</div>;
};

export default BoardList;
