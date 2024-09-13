"use client";

import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/../convex/_generated/api";

const CreateBoard = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({ title: "Untitled", orgId: organization.id })
      .then((id) => {
        toast.success("Board Created.");
      })
      .catch((error) => toast.error("Failed to create board"));
  };

  return (
    <div className="mt-6">
      <Button disabled={pending} onClick={onClick} size="lg">
        Create Board
      </Button>
    </div>
  );
};

export default CreateBoard;
