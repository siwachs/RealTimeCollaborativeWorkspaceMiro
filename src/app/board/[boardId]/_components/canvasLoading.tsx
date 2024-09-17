import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

import { Loader } from "lucide-react";

const CanvasLoading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Loader className="size-6 animate-spin text-muted-foreground" />

      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default CanvasLoading;
