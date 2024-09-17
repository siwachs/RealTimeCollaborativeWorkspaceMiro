"use client";

const liveBlocksPublicKey = process.env
  .NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string;

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const Room: React.FC<{
  roomId: string;
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
}> = ({ roomId, children, fallback }) => {
  return (
    <LiveblocksProvider publicApiKey={liveBlocksPublicKey}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
