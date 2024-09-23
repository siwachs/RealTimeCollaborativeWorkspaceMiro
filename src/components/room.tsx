"use client";

import { ReactNode } from "react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { CanvasLayer } from "@/types/canvas";

const Room: React.FC<{
  roomId: string;
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
}> = ({ roomId, children, fallback }) => {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<CanvasLayer>>(),
          layerIds: new LiveList([]),
        }}
        initialPresence={{ cursor: null, selection: [] }}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
