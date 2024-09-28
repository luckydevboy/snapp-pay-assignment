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

  useEffect(() => {
    const paramsObj = new URLSearchParams();

    if (value) {
      if (/[a-z]+/.test(value)) {
        paramsObj.append("first_name", value);
        paramsObj.append("last_name", value);
      } else if (/[0-9]+/.test(value)) {
        paramsObj.append("phone", value);
      }
    }
    setSearchParams(paramsObj);
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
