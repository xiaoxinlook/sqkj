"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons/searchicon";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search/${encodeURIComponent(searchTerm)}`);
  };

  const searchInput = (
    <Input
    aria-label="Search"
    startContent={<SearchIcon />}
    isClearable
    className="w-full"
    classNames={{
      input: "w-full",
      mainWrapper: "w-full",
    }}
    placeholder="搜索..."
    type="search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  );

  return <form className="w-full" onSubmit={handleSearch}>{searchInput}</form>;
};

export default SearchForm;