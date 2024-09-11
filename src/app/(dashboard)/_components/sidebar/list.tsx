"use client";

import { useOrganizationList } from "@clerk/nextjs";
import Item from "./item";

const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  if (userMemberships.data?.length === 0) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((membership) => (
        <li key={membership.organization.id}>
          <Item
            id={membership.organization.id}
            imageURL={membership.organization.imageUrl}
            name={membership.organization.name}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
