"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

const Canvas: React.FC<{ boardId: string }> = ({ boardId }) => {
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
