import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";

import { LucideIcon } from "lucide-react";

const ToolButton: React.FC<{
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}> = ({ label, icon: Icon, onClick, isActive, isDisabled }) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
