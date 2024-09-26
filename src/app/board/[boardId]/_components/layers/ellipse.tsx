import { PointerEvent } from "react";

import { colorToCSS } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

const Ellipse: React.FC<{
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
}> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCSS(fill) : "#000"}
      stroke={selectionColor ?? "transparent"}
      strokeWidth="1"
    />
  );
};

export default Ellipse;
