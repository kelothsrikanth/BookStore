import { useEffect, useState } from "react";
import { useContext } from "react";
import { usecontext1 } from "./Context/AppContext";

export default function useFetch(url) {
  const { data, setData } = useContext(usecontext1);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url, setData]);
  return [data.items];
}
