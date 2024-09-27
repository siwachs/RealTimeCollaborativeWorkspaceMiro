import { PointerEvent } from "react";

import getStroke from "perfect-freehand";
import { colorToCSS, getSvgPathFromStroke } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";

const Path: React.FC<{
  id: string;
  layer: PathLayer;
  onPointerDown?: (e: PointerEvent, id: string) => void;
  stroke?: string;
}> = ({ id, layer, onPointerDown, stroke }) => {
  const { x, y, points, fill } = layer;

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown && onPointerDown(e, id)}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        }),
      )}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      x={0}
      y={0}
      fill={fill ? colorToCSS(fill) : "#000"}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default Path;
