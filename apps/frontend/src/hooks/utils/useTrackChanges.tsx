/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
function useTrackChanges(stateToCompare: any) {
  const [initialState, setInitialState] = useState<null>(null);
  const [changes, setChanges] = useState(false);
  
    function Compare(){
      if (stateToCompare !== null&&initialState!=null) {
        const sortedInitialState = sortObjectKeys(DeepCopy(initialState));
        const sortedCompareableState = sortObjectKeys(DeepCopy(stateToCompare));
        const change = !(JSON.stringify(sortedInitialState)==JSON.stringify(sortedCompareableState))
        setChanges(change);
      }
    }
  useEffect(() => {
    Compare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[stateToCompare,initialState]); 

useEffect(() => {
if(!initialState) setInitialState(stateToCompare)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [stateToCompare])

const UpdateState = (updatedState:any) => {
    setInitialState(DeepCopy(updatedState));
    Compare();
};
  return { changes, UpdateState };
}


export { useTrackChanges };
const DeepCopy = (obj:{[key:string]:any})=>{
  return JSON.parse(JSON.stringify(obj))
}

const sortObjectKeys = (obj:any) => {
  if(obj){
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj:{[key:string]:any} = {};
    sortedKeys.forEach(key => {
      sortedObj[key] = obj[key]??"";
    });
    return sortedObj;
  }
};
