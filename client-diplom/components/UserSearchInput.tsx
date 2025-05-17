"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { debounce } from "lodash";

export default function UserSearchInput() {
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const { searchUsers, searchResults, hasMoreResults, clearSearch } = useUserStore();

  const debouncedSearch = debounce((q: string) => {
    searchUsers(q, 0);
    setSkip(5);
  }, 300);

  useEffect(() => {
    if (query.length > 1) {
      debouncedSearch(query);
    } else {
      clearSearch();
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const handleLoadMore = () => {
    searchUsers(query, skip);
    setSkip((prev) => prev + 5);
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Поиск пользователей..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-3 py-1.5 rounded-md text-sm"
      />
      {searchResults.length > 0 && (
        <div className="absolute z-20 bg-white shadow w-full mt-1 rounded max-h-60 overflow-y-auto border">
          {searchResults.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id} onClick={() => {
              setQuery("");
              clearSearch();
            }}>
              <div className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm">
                {user.lastName} {user.firstName}
              </div>
            </Link>
          ))}
          {hasMoreResults && (
            <div className="px-3 py-2 text-center">
              <button
                onClick={handleLoadMore}
                className="text-blue-600 text-sm hover:underline"
              >
                Показать ещё
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
