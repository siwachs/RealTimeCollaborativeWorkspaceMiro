"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

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
    </div>
  );
};

export default Item;
