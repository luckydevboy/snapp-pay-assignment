import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
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

  useEffect(() => {
    const paramsObj = new URLSearchParams();

    if (searchParams.get("first_name")) {
      paramsObj.append("first_name", searchParams.get("first_name")!);
    }

    if (searchParams.get("last_name")) {
      paramsObj.append("last_name", paramsObj.get("last_name")!);
    }

    if (searchParams.get("phone")) {
      paramsObj.append("phone", searchParams.get("phone")!);
    }

    setSearchParams(paramsObj);
  }, []);

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
