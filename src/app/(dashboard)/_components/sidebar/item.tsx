"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import Hint from "@/components/hint";

const Item: React.FC<{ id: string; name: string; imageURL: string }> = ({
  id,
  name,
  imageURL,
}) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          fill
          src={imageURL}
          onClick={onClick}
          alt={name}
          className={cn(
            "cursor-pointer rounded-md opacity-75 transition hover:opacity-100",
            isActive && "opacity-100",
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
