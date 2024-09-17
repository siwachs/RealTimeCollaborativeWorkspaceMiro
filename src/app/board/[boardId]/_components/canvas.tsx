"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

const Canvas = () => {
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
