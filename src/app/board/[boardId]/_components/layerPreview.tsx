import { PointerEvent, memo } from "react";
import { useStorage } from "@liveblocks/react/suspense";

import {
  LayerType,
  RectangleLayer,
  EllipseLayer,
  TextLayer,
  NoteLayer,
} from "@/types/canvas";
import Rectangle from "./layers/rectangle";
import Ellipse from "./layers/ellipse";
import Text from "./layers/text";
import Note from "./layers/note";

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
      return (
        <Ellipse
          id={id}
          layer={layer as EllipseLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer as TextLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer as NoteLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    default:
      console.warn("Unknown layer type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
