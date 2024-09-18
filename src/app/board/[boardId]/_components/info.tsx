import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useQuery } from "convex/react";
import { useRenameModal } from "@/store/useRenameModal";

import { Id } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";

import Actions from "@/components/actions";
import { cn } from "@/lib/utils";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="select-none px-1.5 text-neutral-500">|</div>;
};

const Info: React.FC<{ boardId: string }> = ({ boardId }) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  const { onOpen } = useRenameModal();

  if (!data) return <InfoSkeleton />;

  const renameBoard = () => onOpen(data._id, data.title);

  return (
    <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      <Hint label="Go to Boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={40} />
            <span
              className={cn(
                "ml-2 text-xl font-semibold text-black",
                font.className,
              )}
            >
              Miro
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      <Hint label="Edit board name" side="bottom" sideOffset={10}>
        <Button
          onClick={renameBoard}
          variant="board"
          className="px-2 text-base font-normal"
        >
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
  );
};

export default Info;
