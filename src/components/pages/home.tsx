import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";

import { useGetPassengers } from "@/apis";
import { ContactCard, FrequentList } from "@/components";
import { Skeleton } from "@/components/ui/skeleton.tsx";

const Home = () => {
  const [frequents, setFrequents] = useState([]);
  const [searchParams] = useSearchParams();
  const frequentListRef = useRef<HTMLDivElement>(null);
  const [frequentListHeight, setFrequentListHeight] = useState(0);

  useLayoutEffect(() => {
    if (frequentListRef.current) {
      setFrequentListHeight(frequentListRef.current.offsetHeight);
    }
  }, [frequents]);

  const firstName = searchParams.get("first_name") || undefined;
  const lastName = searchParams.get("last_name") || undefined;
  const phone = searchParams.get("phone") || undefined;

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPassengers({
    where: { first_name: firstName, last_name: lastName, phone },
  });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("frequents")!);
    if (storedFavorites) {
      setFrequents(storedFavorites);
    }
  }, []);

  const allRows = data ? data.pages.flatMap((d) => d.items) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const [columnCount, setColumnCount] = useState(4);
  const rowGap = 16;

  const updateColumnCount = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setColumnCount(4);
    } else if (width >= 768) {
      setColumnCount(3);
    } else if (width >= 640) {
      setColumnCount(2);
    } else {
      setColumnCount(1);
    }
  };

  useEffect(() => {
    updateColumnCount();

    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage
      ? Math.ceil(allRows.length / columnCount) + 1
      : Math.ceil(allRows.length / columnCount),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140 + rowGap,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= Math.ceil(allRows.length / columnCount) - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    columnCount,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <>
      <FrequentList ref={frequentListRef} contacts={frequents} />
      {status === "pending" ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-6 rounded-xl custom-scrollbar overflow-y-auto"
          style={{
            height: `calc(100vh - ${frequentListHeight}px - 128px)`,
          }}
        >
          {Array.from({ length: 32 }).map(() => (
            <Skeleton className="w-full h-[140px]" />
          ))}
        </div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : !allRows.length ? (
        "No contact found!"
      ) : (
        <div
          ref={parentRef}
          className="custom-scrollbar w-full overflow-y-auto"
          style={{
            height: `calc(100vh - ${frequentListHeight}px - 128px)`,
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
            className="relative"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columnCount;
              const endIndex = Math.min(
                startIndex + columnCount,
                allRows.length,
              );

              return (
                <div
                  key={virtualRow.index}
                  className="absolute top-0 left-0 w-full grid gap-x-4 pr-4"
                  style={{
                    height: `${virtualRow.size - rowGap}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                  }}
                >
                  {Array.from({ length: endIndex - startIndex }).map(
                    (_, idx) => {
                      const contact = allRows[startIndex + idx];

                      return contact ? (
                        <ContactCard key={contact.id} contact={contact} />
                      ) : null;
                    },
                  )}
                  {hasNextPage &&
                  virtualRow.index ===
                    Math.ceil(allRows.length / columnCount) ? (
                    <span>Loading more...</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
