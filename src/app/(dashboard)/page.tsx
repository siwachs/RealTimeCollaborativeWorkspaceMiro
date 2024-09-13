"use client";

import { useOrganization, CreateOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import BoardList from "./_components/boardList";
import EmptyState from "./_components/emptyState";

type PageProps = {
  searchParams: { keyword?: string; favorites?: string };
};

function DashboardPage({ searchParams }: Readonly<PageProps>) {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%-80px)] flex-1 p-6">
      {!organization ? (
        <EmptyState
          imageURL="/elements.svg"
          imageAlt="Empty Org"
          height={200}
          width={200}
          title="Welcome to Miro - Realtime Collaborative Workspace"
          subTitle="Create a Organization to get started"
        >
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
        </EmptyState>
      ) : (
        <BoardList orgId={organization.id} searchParams={searchParams} />
      )}
    </div>
  );
}

export default DashboardPage;
