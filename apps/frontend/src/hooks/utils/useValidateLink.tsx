

import validateLinkApi from "@/api/utils/link-validator.api";
import { IResourceLink } from "@/types/Iresource";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

const useValidateLink = (setisValid:React.Dispatch<React.SetStateAction<boolean>>) => {
    const {setValue} = useFormContext<IResourceLink>()
    return useMutation({
      mutationKey:"validate link",
      mutationFn: (link:string) => validateLinkApi(link),
      onSuccess(data) {
        setValue("title",data.payload.title)
        setisValid(true);
      },
      onError() {
        setisValid(false);
      },
    });
};

export default useValidateLink;

