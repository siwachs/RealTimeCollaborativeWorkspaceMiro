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
  Layer,
} from "@/types/canvas";
import {
  connectionIdToColor,
  findIntersectiongLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursorsPresence";
import LayerPreview from "./layerPreview";
import SelectionBox from "./selectionBox";
import SelectionTools from "./selectionTools";

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

  const unselectSelectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length === 0) return;

    setMyPresence({ selection: [] }, { addToHistory: true });
  }, []);

  const startSelectionNet = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5)
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

      const ids = findIntersectiongLayersWithRectangle(
        layerIds,
        layers as ReadonlyMap<string, Layer>,
        origin,
        current,
      );

      setMyPresence({ selection: ids });
    },
    [layerIds],
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        !pencilDraft
      )
        return;

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        !pencilDraft ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)),
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor],
  );

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

  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer)
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing)
        startSelectionNet(current, canvasState.origin);
      else if (canvasState.mode === CanvasMode.SelectionNet)
        updateSelectionNet(current, canvasState.origin);
      else if (canvasState.mode === CanvasMode.Translating)
        translateSelectedLayer(current);
      else if (canvasState.mode === CanvasMode.Resizing)
        resizeSelectedLayer(current);
      else if (canvasState.mode === CanvasMode.Pencil)
        continueDrawing(current, e);

      setMyPresence({ cursor: current });
    },
    [
      continueDrawing,
      canvasState.mode,
      resizeSelectedLayer,
      camera.x,
      camera.y,
      translateSelectedLayer,
      startSelectionNet,
      updateSelectionNet,
      resizeSelectedLayer,
    ],
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

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) return;
      else if (canvasState.mode === CanvasMode.Pencil)
        startDrawing(point, e.pressure);
      else setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera.x, camera.y, canvasState.mode, setCanvasState],
  );

  const onPointerUp = useMutation(
    ({ self }, e: PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.NONE ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectSelectLayers();
        setCanvasState({ mode: CanvasMode.NONE });
      } else if (canvasState.mode === CanvasMode.Pencil) insertPath();
      else if (canvasState.mode === CanvasMode.Inserting)
        insertLayer(canvasState.layerType, point);
      else setCanvasState({ mode: CanvasMode.NONE });

      history.resume();
    },
    [
      setCanvasState,
      camera.x,
      camera.y,
      canvasState.mode,
      history,
      insertLayer,
      unselectSelectLayers,
      insertPath,
    ],
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
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
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

          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}

          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
