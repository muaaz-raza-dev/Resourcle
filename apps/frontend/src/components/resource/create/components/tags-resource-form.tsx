import RequestLoader from "@/components/loader/request-loading";
import useSearchTags from "@/hooks/tags/useSearchTags";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { searchedTagsAtom } from "@/state/tags.atom";
import { IResource } from "@/types/Iresource";
import { Select } from "antd";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useDebouncedCallback } from "use-debounce";

export default function TagsResourceForm() {
  const methods = useFormContext<IResource>();
  const { mutate, isLoading } = useSearchTags();
  const debounced = useDebouncedCallback((value: string) => {
    if (value) {
      mutate(value);
    }
  }, 800);
  useEffect(() => {
    mutate("");
  }, []);
  const tags = useRecoilValue(searchedTagsAtom);
  return (
    <section className="w-full border-y py-4">
      <FormField
        control={methods.control}
        rules={{required:"Select at least one category"}}
        name="tags"
        render={({ field }) => (
          <FormItem className="w-full ">
            <div className="">
            <FormLabel className=""> Select a Category </FormLabel>
              <FormDescription>
              Choose the most relevant category for your resource. This helps
              users find it easily. If you’re unsure, pick the closest match
              </FormDescription>
            </div>
            <FormControl className="w-full">
              <Select
                {...field}
                id="categories"
                className="w-full"
                placeholder="Select an appropriate category"
                mode="multiple"
                options={tags.map((t) => ({ value: t._id, label: t.name }))}
                onSearch={(select) => debounced(select)} 
                notFoundContent={
                  isLoading ? (
                    <div className="center">
                      <RequestLoader />
                    </div>
                  ) : (
                    "No categories found"
                  )
                }
                loading={isLoading}
                virtual // Improves scrolling performance for large datasets
                style={{
                  transition: "all 0.2s ease-in-out",
                }}
                
                dropdownStyle={{
                  borderRadius: "8px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
