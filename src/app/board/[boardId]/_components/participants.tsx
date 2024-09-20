import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { connectionIdToColor } from "@/lib/utils";
import UserAvatar from "./userAvatar";

const MAX_SHOWN_USERS = 2;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            source={info?.imageURL}
            name={info?.name}
            fallback={info?.name?.[0] ?? "U"}
          />
        ))}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            source={currentUser.info?.imageURL}
            name={`${currentUser.info?.name} (You)`}
            fallback={`${currentUser.info?.name?.[0] ?? "U"} (You)`}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute right-2 top-2 flex h-12 w-[100px] items-center rounded-md bg-white p-3 shadow-md" />
  );
};

export default Participants;
