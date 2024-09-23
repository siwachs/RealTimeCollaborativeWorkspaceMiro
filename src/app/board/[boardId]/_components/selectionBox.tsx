import { memo } from "react";
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
  console.log(bounds);
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

      <></>
    </>
  );
});

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;
