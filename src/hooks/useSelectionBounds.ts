import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { shallow } from "@liveblocks/react";

import { CanvasLayer, XYWH } from "@/types/canvas";

const boundingBox = (layers: CanvasLayer[]): XYWH | null => {
  const firstLayer = layers?.[0];

  if (!firstLayer) return null;

  let left = firstLayer.x,
    right = firstLayer.x + firstLayer.width,
    top = firstLayer.y,
    bottom = firstLayer.y + firstLayer.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) left = x;

    if (right < x + width) right = x + width;

    if (top > y) top = y;

    if (bottom < y + height) bottom = y + height;
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

const useSelectionBound = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId))
      .filter(Boolean);

    return boundingBox(selectedLayers as CanvasLayer[]);
  }, shallow);
};

export default useSelectionBound;
