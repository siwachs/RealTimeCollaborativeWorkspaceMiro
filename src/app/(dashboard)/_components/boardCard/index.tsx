import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";

import { toast } from "sonner";
import { api } from "@/../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import Overlay from "./overlay";
import Actions from "@/components/actions";
import Footer from "./footer";

import { MoreHorizontal } from "lucide-react";

const BoardCard: React.FC<{
  id: string;
  title: string;
  imageURL: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite?: boolean;
}> = ({
  id,
  title,
  imageURL,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite = false,
}) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { pending: pendingFavorite, mutate: mutateFavorite } = useApiMutation(
    api.board.favorite,
  );
  const { pending: pendingUnFavorite, mutate: mutateUnFavorite } =
    useApiMutation(api.board.unFavorite);

  const toogleFavorite = () => {
    if (isFavorite)
      return mutateUnFavorite({ id }).catch((error) =>
        toast.error("Failed to unfavorite"),
      );

    mutateFavorite({ id, orgId }).catch((error) =>
      toast.error("Failed to favorite"),
    );
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageURL} alt="Doodle" fill className="object-contain" />
          <Overlay />

          <Actions id={id} title={title} side="right">
            <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toogleFavorite}
          disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
};

export const BoardCardSkeleton: React.FC = () => (
  <div className="aspect-[100/127] overflow-hidden rounded-lg">
    <Skeleton className="h-full w-full" />
  </div>
);

export default BoardCard;
