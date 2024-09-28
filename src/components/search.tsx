import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui";
import { useGetSearchPassengers } from "@/apis";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const [search, setSearch] = useState("");
  const [value, { isPending }] = useDebounce(search, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // useGetSearchPassengers({ where: searchParams.get('where') });

  useEffect(() => {
    if (value) {
      setSearchParams(
        JSON.stringify({
          where: {
            or: [
              { first_name: { contains: value } },
              { last_name: { contains: value } },
              { phone: { contains: value } },
            ],
          },
        }),
      );
    } else {
      setSearchParams();
    }
  }, [value]);

  return (
    <div className={cx("relative", className)}>
      <Input
        type="text"
        placeholder="Search contact..."
        onChange={({ target }) => {
          setSearch(target.value);
        }}
        value={search}
      />
    </div>
  );
};

export default Search;
