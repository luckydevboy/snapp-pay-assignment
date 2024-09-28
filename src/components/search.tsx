import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui";
import { useDynamicSearchParams } from "@/lib/hooks";

type Props = {
  className?: string;
};

const paramMappings: Record<string, RegExp> = {
  first_name: /[a-z]+/,
  last_name: /[a-z]+/,
  phone: /[0-9]+/,
};

const Search = ({ className }: Props) => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const { searchParams } = useDynamicSearchParams(value, paramMappings);

  useEffect(() => {
    const firstName = searchParams.get("first_name") ?? "";
    const phone = searchParams.get("phone") ?? "";

    if (!search) {
      setSearch(firstName || phone);
    }
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
