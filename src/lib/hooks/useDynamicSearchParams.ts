import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useDynamicSearchParams = (
  value: string,
  mappings: Record<string, RegExp>,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mapSearchToParams = (
    search: string,
    mappings: Record<string, RegExp>,
  ) => {
    const paramsObj = new URLSearchParams();
    Object.entries(mappings).forEach(([key, regex]) => {
      if (regex.test(search)) {
        paramsObj.append(key, search);
      }
    });
    return paramsObj;
  };

  const setInitialParams = (searchParams: URLSearchParams) => {
    const paramsObj = new URLSearchParams();
    searchParams.forEach((value, key) => {
      paramsObj.append(key, value);
    });
    return paramsObj;
  };

  useEffect(() => {
    const paramsObj = mapSearchToParams(value, mappings);
    setSearchParams(paramsObj);
  }, [value]);

  useEffect(() => {
    const paramsObj = setInitialParams(searchParams);
    setSearchParams(paramsObj);
  }, []);

  return { searchParams, setSearchParams };
};

export default useDynamicSearchParams;
