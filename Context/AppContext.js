import React, { useState } from "react";
import { createContext } from "react";
// import { useState } from "react";

export const usecontext1 = createContext();

export const ContextFun = (props) => {
  const [data, setData] = useState([]);

  const val = { data, setData };

  return (
    <usecontext1.Provider value={val}>{props.children}</usecontext1.Provider>
  );
};
