import { PointerEvent, memo } from "react";
import { useStorage } from "@liveblocks/react/suspense";

import { LayerType, RectangleLayer } from "@/types/canvas";
import Rectangle from "./layers/rectangle";

const LayerPreview: React.FC<{
  id: string;
  onLayerPointerDown: (e: PointerEvent, layerId: string) => void;
  selectionColor?: string;
}> = memo(({ id, onLayerPointerDown, selectionColor }) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) return null;

  switch (layer?.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer as RectangleLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Ellipse:
      return <></>;

    default:
      // console.warn("Unknown layer type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
