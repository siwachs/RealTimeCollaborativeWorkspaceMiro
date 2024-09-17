import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/../convex/_generated/api";

import { Plus } from "lucide-react";

const NewBoardButton: React.FC<{ orgId: string; disabled?: boolean }> = ({
  orgId,
  disabled = false,
}) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({ title: "Untitled", orgId })
      .then((id) => {
        router.push(`/board/${id}`);
        toast.success("Board Created.");
      })
      .catch((error) => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={disabled || pending}
      className={cn(
        "col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800",
        (disabled || pending) &&
          "cursor-not-allowed opacity-75 hover:bg-blue-600",
      )}
      onClick={onClick}
    >
      <Plus className="size-12 stroke-1 text-white" />
      <p className="text-sm font-light text-white">New Board</p>
    </button>
  );
};

export default NewBoardButton;
