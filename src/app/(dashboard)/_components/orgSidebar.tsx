"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { LayoutDashboard, Star } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <aside className="hidden w-[206px] space-y-6 pl-5 pt-5 lg:flex lg:flex-col">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          <span className={cn("text-2xl font-semibold", font.className)}>
            Miro
          </span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />

      <div className="w-full space-y-1">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 size-4" />
            Team Boards
          </Link>
        </Button>

        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Star className="mr-2 size-4" />
            Favourite Boards
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default OrgSidebar;
