"use client";

import { useState, PointerEvent, WheelEvent, useCallback } from "react";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "@liveblocks/react/suspense";

import { pointerEventToCanvasPoint } from "@/lib/utils";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
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

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const onPointerMove = useMutation(({ setMyPresence }, e: PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);

    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onWheel = useCallback((e: WheelEvent) => {
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
  }, []);

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

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
