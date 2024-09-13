import { OrganizationProfile } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 size-4" />
          Invite Members
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[880px] border-none bg-transparent p-0">
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
