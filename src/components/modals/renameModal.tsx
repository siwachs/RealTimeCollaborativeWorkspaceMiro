"use client";

import { useEffect, useState, FormEventHandler, FormEvent } from "react";
import { useRenameModal } from "@/store/useRenameModal";
import { useApiMutation } from "@/hooks/useApiMutation";

import { api } from "@/../convex/_generated/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RenameModal = () => {
  const { pending, mutate } = useApiMutation(api.board.update);

  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();

    mutate({ id: initialValues.id, title: title })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to renamed board"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>

        <DialogDescription>Enter a new title for this board</DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            value={title}
            onChange={onChange}
            required
            maxLength={60}
            placeholder="Board title"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
