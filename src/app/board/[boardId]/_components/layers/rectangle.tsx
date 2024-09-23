import { PointerEvent } from "react";

import { RectangleLayer } from "@/types/canvas";

const Rectangle: React.FC<{
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor: string;
}> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill="#000"
      stroke="transparent"
    />
  );
};

export default Rectangle;
