import { dotPulse } from "ldrs";

import React, { useEffect } from "react";

export default function RequestLoader(props:{dark?:boolean,stroke?:string,color?:string,size?:string}) {
  useEffect(() => {
    dotPulse.register();
  }, []);
  return <l-dot-pulse {...props} speed="1.3" color="black"></l-dot-pulse>;
}
