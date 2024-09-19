import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar: React.FC<{
  source?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}> = ({ source, name, fallback, borderColor }) => {
  return (
    <Hint label={name ?? "Unknown"} side="bottom" sideOffset={18}>
      <Avatar className="size-8 border-2" style={{ borderColor }}>
        <AvatarImage src={source} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
