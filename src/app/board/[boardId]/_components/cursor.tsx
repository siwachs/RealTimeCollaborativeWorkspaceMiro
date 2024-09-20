import { memo } from "react";
import { useOther } from "@liveblocks/react/suspense";

import { connectionIdToColor } from "@/lib/utils";

import { MousePointer2 } from "lucide-react";

const Cursor: React.FC<{ connectionId: number }> = memo(({ connectionId }) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursorPresence = useOther(connectionId, (user) => user?.presence);

  const name = info?.name ?? "Unknown";

  if (!cursorPresence.cursor) return null;

  const { x, y } = cursorPresence.cursor;

  return (
    <foreignObject style={{ transform: `translateX(${x}px)` }}>
      <MousePointer2
        className="size-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
