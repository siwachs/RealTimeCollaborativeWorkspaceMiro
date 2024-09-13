import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import Overlay from "./overlay";
import Footer from "./footer";

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

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageURL} alt="Doodle" fill className="object-contain" />
          <Overlay />
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
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
