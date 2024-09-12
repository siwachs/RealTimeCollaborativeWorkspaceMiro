"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const debouncedValue = useDebounceValue(keyword, 500);

  const ChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          keyword,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue[0], router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        value={keyword}
        onChange={ChangeKeyword}
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
      />
    </div>
  );
};

export default SearchInput;
