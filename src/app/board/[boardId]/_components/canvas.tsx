"use client";

import { useState, PointerEvent, WheelEvent, useCallback } from "react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
  useStorage,
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

import {
  Camera,
  CanvasMode,
  CanvasState,
  CanvasLayer,
  LayerType,
  Color,
  Point,
} from "@/types/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursorsPresence";
import LayerPreview from "./layerPreview";

const MAX_LAYERS = 100;

const Canvas: React.FC<{ boardId: string }> = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

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

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.NONE });
    },
    [lastUsedColor],
  );

  const onPointerUp = useMutation(
    ({}, e: PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting)
        insertLayer(canvasState.layerType, point);
      else setCanvasState({ mode: CanvasMode.NONE });

      history.resume();
    },
    [camera.x, camera.y, canvasState.mode, history, insertLayer],
  );

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
        onPointerUp={onPointerUp}
      >
        <g
          style={{ transform: `translate3d(${camera.x}px, ${camera.y}px, 0)` }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor="#000"
            />
          ))}

          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
