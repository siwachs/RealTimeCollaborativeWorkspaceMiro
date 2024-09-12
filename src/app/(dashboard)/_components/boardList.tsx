import React from "react";

const BoardList: React.FC<{
  organization: string;
  searchParams: { keyword?: string; favorites?: string };
}> = ({ organization, searchParams }) => {
  const data = []; //API call to board fetch.

  return <div>BoardList:React.FC</div>;
};

export default BoardList;
