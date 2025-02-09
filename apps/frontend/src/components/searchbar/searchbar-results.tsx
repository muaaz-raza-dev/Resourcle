import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shadcn/components/ui/command";
import { IpartialSearchPayload } from "@/api/search/advanced-partial-search.api";
import SearchedResourceComponent from "./searched-resource-component";
import SearchedUserComponent from "./searched-user-component";
import { useRouter } from "next/navigation";
import SearchedLinkComponent from "./searched-link-component";

export default function SearchbarResults({
  data,
  Close,
}: {
  data: IpartialSearchPayload;
  Close: () => void;
}) {
  const { push } = useRouter();
  return (
    <CommandList>
         <CommandGroup heading=" Links ">
        {data && data?.links.length > 0 ? (
          <>
            {data?.links.map((link) => {
              return (
                <CommandItem key={link._id}>
                  <SearchedLinkComponent Close={Close} link={link} />
                </CommandItem>
              );
            })}
          </>
        ) : (
          <CommandItem>
            <span className="center text-muted-foreground">
              No links found.
            </span>
          </CommandItem>
        )}
      </CommandGroup>
      <CommandSeparator />
      
      <CommandGroup heading="Resources">
        {data && data?.resources.length > 0 ? (
          <>
            {data?.resources.map((resource) => {
              return (
                <CommandItem key={resource._id}>
                  <SearchedResourceComponent
                    Close={Close}
                    resource={resource}
                  />
                </CommandItem>
              );
            })}
            {data?.resources.length > 5 ? (
              <div className="flex justify-center items-center gap-2 my-2">
                <button
                  className="bg-secondary text-sm text-black rounded-md px-3  py-1 hover:bg-primary-darker"
                  onClick={() => {
                    push("");
                    Close();
                  }}
                >
                  more results
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <CommandItem>
            <span className="center text-muted-foreground">
              No resources found.
            </span>
          </CommandItem>
        )}
      </CommandGroup>
      <CommandSeparator />

   

      {data && data?.users.length > 0 ? (
        <CommandGroup heading="Users">
          {data?.users.map((value) => {
            return (
              <CommandItem key={value._id}>
                <SearchedUserComponent user={value} Close={Close} />
              </CommandItem>
            );
          })}
          <CommandSeparator />
        </CommandGroup>
      ) : null}

      {data.tags.length > 0 ? (
        <CommandGroup heading="Categories">
          <div className="flex  overflow-x-auto flex-wrap gap-2">
            {data?.tags.map((value) => {
              return (
                <>
                  <button
                    key={value._id}
                    className="bg-secondary px-3 rounded-md  py-1 text-sm  border-2 border-black font-bold whitespace-nowrap hover:border-primary transition-colors"
                  >
                    {value.name}
                  </button>
                </>
              );
            })}
          </div>
        </CommandGroup>
      ) : null}
    </CommandList>
  );
}
