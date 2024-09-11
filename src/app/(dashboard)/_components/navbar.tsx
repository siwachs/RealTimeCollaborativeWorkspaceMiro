"use client";

import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-4 bg-green-500 p-5">
      <div className="hidden flex-1 bg-yellow-500 lg:flex">Search Input</div>

      <UserButton />
    </nav>
  );
};

export default Navbar;
