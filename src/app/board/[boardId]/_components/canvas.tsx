"use client";

import { useState } from "react";
import { useHistory, useCanUndo, useCanRedo } from "@liveblocks/react/suspense";

import { CanvasMode, CanvasState } from "@/types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursorsPresence";

const Canvas: React.FC<{ boardId: string }> = ({ boardId }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
        canRedo={canRedo}
      />

      <svg className="h-[100vh] w-[100vw]">
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
