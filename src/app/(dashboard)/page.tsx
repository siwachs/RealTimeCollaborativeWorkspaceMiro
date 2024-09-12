"use client";

import { useOrganization } from "@clerk/nextjs";

import EmptyOrg from "./_components/emptyOrg";
import BoardList from "./_components/boardList";

type PageProps = {
  searchParams: { keyword?: string; favorites?: string };
};

function DashboardPage({ searchParams }: Readonly<PageProps>) {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%-80px)] flex-1 p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList organization={organization.id} searchParams={searchParams} />
      )}
    </div>
  );
}

export default DashboardPage;
