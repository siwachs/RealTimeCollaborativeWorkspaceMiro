import { PointerEvent } from "react";
import { Kalam } from "next/font/google";
import { useMutation } from "@liveblocks/react/suspense";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCSS } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";

const font = Kalam({ subsets: ["latin"], weight: ["400"] });

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
};

const Text: React.FC<{
  id: string;
  layer: TextLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
}> = ({ id, layer, onPointerDown, selectionColor }) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const updateContentValue = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value ?? "Text"}
        onChange={updateContentValue}
        className={cn(
          "flex h-full w-full items-center justify-center text-center outline-none drop-shadow-md",
          font.className,
        )}
        style={{
          color: fill ? colorToCSS(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};

export default Text;
