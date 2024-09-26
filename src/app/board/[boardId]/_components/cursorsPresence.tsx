import { memo } from "react";
import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react/suspense";

import { PathLayer } from "@/types/canvas";
import Cursor from "./cursor";
import Path from "./layers/path";

const Cursors = () => {
  const connectionIds = useOthersConnectionIds();

  return (
    <>
      {connectionIds.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft)
          return (
            <Path
              key={key}
              id="pathId"
              layer={
                {
                  points: other.pencilDraft,
                  fill: other.penColor,
                } as PathLayer
              }
            />
          );
      })}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
