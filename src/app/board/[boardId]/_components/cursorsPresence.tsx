import { memo } from "react";
import { useOthersConnectionIds } from "@liveblocks/react/suspense";

import Cursor from "./cursor";

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

const CursorsPresence = memo(() => {
  return <Cursors />;
});

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
