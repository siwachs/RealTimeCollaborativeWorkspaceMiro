import Link from "next/link";
import Image from "next/image";

import Overlay from "./overlay";

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
  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageURL} alt="Doodle" fill className="object-contain" />
          <Overlay />
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
