

import validateLinkApi from "@/api/utils/link-validator.api";
import { IResourceLink } from "@/types/Iresource";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

const useValidateLink = (setisValid:React.Dispatch<React.SetStateAction<boolean>>) => {
    const {setValue,getValues} = useFormContext<IResourceLink>()
    return useMutation({
      mutationKey:"validate link",
      mutationFn: (link:string) => validateLinkApi(link),
      onSuccess(data) {
        if(!getValues("title")&&data.payload.title){ setValue("title",data.payload.title)}
        setisValid(true);
      },
      onError() {
        setisValid(false);
      },
    });
};

export default useValidateLink;

