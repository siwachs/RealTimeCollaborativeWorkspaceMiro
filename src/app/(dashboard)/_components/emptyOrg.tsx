import Image from "next/image";

import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const EmptyOrg = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/elements.svg" alt="Empty Org" height={200} width={200} />

      <h2 className="mt-6 select-none text-2xl font-semibold">
        Welcome to Miro - Realtime Collaborative Workspace
      </h2>

      <p className="mt-2 select-none text-sm text-muted-foreground">
        Create a Organization to get started
      </p>

      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create an Organization</Button>
          </DialogTrigger>

          <DialogContent className="max-w-[480px] border-none bg-transparent p-0">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
