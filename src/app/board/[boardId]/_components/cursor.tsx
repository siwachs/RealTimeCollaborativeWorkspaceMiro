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
    <foreignObject
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="size-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />

      <div
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
        className="absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
