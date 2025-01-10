"use client";
import { ring} from "ldrs";

import React, { useEffect } from "react";

export default function RequestLoader(props:{dark?:boolean,stroke?:string,color?:string,size?:string}) {
  useEffect(() => {
    ring.register();
  }, []);
  return <l-ring {...props} speed="1.3" size={16} stroke={1.5}  color={props.dark?"white":"black"}/>;
}
