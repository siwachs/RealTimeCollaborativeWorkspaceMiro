"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import ConfirmModal from "./confirmModal";

import { api } from "@/../convex/_generated/api";

import { Link2, Trash2 } from "lucide-react";

const Actions: React.FC<{
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}> = ({ children, side, sideOffset, id, title }) => {
  const { pending, mutate } = useApiMutation(api.board.remove);

  const copyLink = () => {
    window.navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link Copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const deleteBoard = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => {
        toast.error("Failed to delete board");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={copyLink} className="cursor-pointer p-3">
          <Link2 className="mr-2 size-4" />
          Copy board link
        </DropdownMenuItem>

        <ConfirmModal
          header="Delete Board?"
          description="This will delete board and all of its content."
          disabled={pending}
          onConfirm={deleteBoard}
        >
          <Button
            variant="ghost"
            className="w-full justify-start p-3 text-sm font-normal"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
