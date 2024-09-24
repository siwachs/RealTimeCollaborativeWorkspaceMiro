"use client";

import {
  useState,
  PointerEvent,
  WheelEvent,
  useCallback,
  useMemo,
} from "react";
import { LiveObject } from "@liveblocks/client";
import {
  useStorage,
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useOthersMapped,
} from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

import {
  Camera,
  CanvasMode,
  CanvasState,
  LayerType,
  Color,
  Point,
  Side,
  XYWH,
  CanvasLayer,
} from "@/types/canvas";
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursorsPresence";
import LayerPreview from "./layerPreview";
import SelectionBox from "./selectionBox";

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

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection?.[0]);

      if (layer) layer.update(bounds);
    },
    [canvasState.mode],
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Resizing)
        resizeSelectedLayer(current);

      setMyPresence({ cursor: current });
    },
    [canvasState.mode, resizeSelectedLayer, camera.x, camera.y],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();

      setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner });
    },
    [history],
  );

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

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      )
        return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera.x, camera.y, history, canvasState.mode],
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layedId of selection) {
        layerIdsToColorSelection[layedId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

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
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}

          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
