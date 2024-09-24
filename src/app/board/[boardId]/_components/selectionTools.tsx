import { memo } from "react";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import useSelectionBound from "@/hooks/useSelectionBounds";
import useDeleteLayers from "@/hooks/useDeleteLayers";

import { Camera, Color } from "@/types/canvas";
import ColorPicker from "./colorPicker";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";

import { Trash2 } from "lucide-react";

const SelectionTools: React.FC<{
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}> = memo(({ camera, setLastUsedColor }) => {
  const selection = useSelf((me) => me.presence.selection);

  const selectionBounds = useSelectionBound();

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");

      setLastUsedColor(fill);

      selection.forEach((id) => liveLayers.get(id)?.set("fill", fill));
    },
    [selection, setLastUsedColor],
  );

  const deleteLayer = useDeleteLayers();

  if (!selectionBounds) return null;

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute flex select-none rounded-xl border bg-white p-3 shadow-sm"
      style={{
        transform: `translate3d(calc(${x}px - 50%), calc(${y - 16}px - 100%), 0)`,
      }}
    >
      <ColorPicker onChange={setFill} />

      <div className="ml-2 flex items-center border-l border-neutral-200 pl-2">
        <Hint label="Delete">
          <Button variant="board" size="icon" onClick={deleteLayer}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
