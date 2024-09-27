import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useGetPassengers } from "@/apis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

const Home = () => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetPassengers();

  const allRows = data ? data.pages.flatMap((d) => d.items) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const [columnCount, setColumnCount] = useState(4);
  const rowGap = 16;

  const updateColumnCount = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setColumnCount(4);
    } else if (width >= 900) {
      setColumnCount(3);
    } else if (width >= 600) {
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
    overscan: 5,
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
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div
          ref={parentRef}
          className="custom-scrollbar"
          style={{
            height: `calc(100vh - 56px - 48px)`,
            width: `100%`,
            overflow: "auto",
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
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
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size - rowGap}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                    columnGap: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  {Array.from({ length: endIndex - startIndex }).map(
                    (_, idx) => {
                      const passenger = allRows[startIndex + idx];

                      return passenger ? (
                        <Card key={passenger.id}>
                          <CardHeader>
                            <CardTitle>
                              {passenger.first_name} {passenger.last_name}
                            </CardTitle>
                            <CardDescription>
                              {passenger.company}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div>{passenger.phone}</div>
                          </CardContent>
                        </Card>
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
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </>
  );
};

export default Home;
