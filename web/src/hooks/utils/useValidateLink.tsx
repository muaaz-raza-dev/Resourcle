

import validateLinkApi from "@/api/utils/link-validator.api";
import { useMutation } from "react-query";

const useValidateLink = (setisValid:React.Dispatch<React.SetStateAction<boolean>>) => {
    return useMutation({
      mutationKey:"validate link",
      mutationFn: (link:string) => validateLinkApi(link),
      onSuccess(data) {
        console.log("Data fetched successfully", data);
        setisValid(true);
      },
      onError(error) {
        console.error("Error fetching data", error);
        setisValid(false);
      },
    });
};

export default useValidateLink;

