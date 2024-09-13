"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

const Actions: React.FC<{
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}> = ({ children, side, sideOffset, id, title }) => {
  return <div className="absolute right-1 top-1 z-50">Actions</div>;
};

export default Actions;
