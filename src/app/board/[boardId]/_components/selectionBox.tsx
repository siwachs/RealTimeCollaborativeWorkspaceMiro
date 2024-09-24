import { memo, PointerEvent } from "react";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import useSelectionBound from "@/hooks/useSelectionBounds";

import { LayerType, Side, XYWH } from "@/types/canvas";

const HANDLE_WIDTH = 8;

const SelectionBox: React.FC<{
  onResizeHandlePointerDown: () => void;
  corner: Side;
  initialBound: XYWH;
}> = memo(({ onResizeHandlePointerDown }) => {
  const soleLayerId = useSelf((me) => me.presence.selection?.[0] ?? null);

  const isShowHandles = useStorage(
    (root) =>
      soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
  );

  const bounds = useSelectionBound();
  if (!bounds) return null;

  return (
    <>
      <rect
        className="pointer-events-none fill-transparent stroke-blue-500 stroke-1"
        style={{ transform: `translate3d(${bounds.x}px, ${bounds.y}px, 0)` }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />

      {isShowHandles && (
        <>
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
              ${bounds.y - HANDLE_WIDTH / 2}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
              ${bounds.y + bounds.height / 2 - HANDLE_WIDTH}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
              ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />

          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate3d(
              ${bounds.x - HANDLE_WIDTH / 2}px, 
              ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px, 0)`,
            }}
            onPointerDown={(e: PointerEvent) => {
              e.stopPropagation();
              // TODO: Add Resize
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;
