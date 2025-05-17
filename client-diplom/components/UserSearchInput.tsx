"use client";

import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { debounce } from "lodash";
import { Card, Flex, Text, TextField, Badge } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function UserSearchInput() {
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // 👇 Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        clearSearch();
        setQuery('');
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearSearch]);

  const handleLoadMore = () => {
    searchUsers(query, skip);
    setSkip((prev) => prev + 5);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <TextField.Root
        type="text"
        placeholder="Поиск пользователей..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="3"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      {searchResults.length > 0 && (
        <div className="absolute z-20 w-full mt-1">
          <Card>
            <Flex direction="column" gap="3">
              {searchResults.map((user) => (
                <Link
                  href={`/users/${user.id}`}
                  key={user.id}
                  onClick={() => {
                    setQuery("");
                    clearSearch();
                  }}
                >
                  <Card className="hover:bg-slate-200 cursor-pointer">
                    <Flex direction="column" gap="1">
                      <Flex direction="row" gap="1">
                        <Text size='3'>{user.lastName}</Text>
                        <Text size='3'>{user.firstName}</Text>
                      </Flex>
                      <Badge size='3' className="w-fit">{user.role.description}</Badge>
                    </Flex>
                  </Card>
                </Link>
              ))}
            </Flex>
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
          </Card>
        </div>
      )}
    </div>
  );
}
