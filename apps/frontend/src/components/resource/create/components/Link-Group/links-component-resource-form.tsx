import React from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import NewLinkDailogResourceForm from "./new-link-dailog-resource-form";
import { useFormContext } from "react-hook-form";
import { IResource } from "@/types/Iresource";
import { Tooltip } from "antd";
export default function LinksComponentResourceForm({
  index,
}: {
  index: number;
}) {
  const form = useFormContext<IResource>();
  const links = form.watch(`content.${index}.links`);
  function DeleteLink(linkIndex: number) {
    form.setValue(
      `content.${index}.links`,
      form.getValues(`content.${index}.links`).filter((_, i) => linkIndex != i)
    );
  }
  return (
    <section className="flex flex-col gap-2 px-2">
      {links?.length == 0 ? (
        <>
        <div className="flex gap-4 items-center justify-center">
          
        <h1 className="text font-semibold">No links </h1>
          <NewLinkDailogResourceForm linkGroupIndex={index} linkIndex={0}>
            <button type="button" className=" bg-secondary font-bold rounded-md h-full p-2 aspect-square  center">
              <FaPlus />
            </button>
          </NewLinkDailogResourceForm>
          </div>
        <div className="flex gap-4 center">

          <p className="text-sm text-muted-foreground">
            Add links to organize the spreaded information into one place .
          </p>
        
          </div>
        </>
      ) : (
        links?.map((link, i) => {
          return (
            <section key={i + link.url}>
              <div className="flex  gap-4  items-center">
                <NewLinkDailogResourceForm
                  linkGroupIndex={index}
                  linkIndex={i + 1}
                >
                  <button type="button" className="  bg-secondary font-bold text-sm rounded-md p-2 h-full aspect-square  center">
                    <FaPlus />
                  </button>
                </NewLinkDailogResourceForm>

                <div className="flex justify-between bg-secondary hover:rounded transition-all w-full rounded-md p-3">
              <Tooltip title={link.description}>
                  <div className="flex items-center gap-6">
                    <h1 className="font-bold cursor-default text-lg hover:text-primary transition-colors">{link.title}</h1>
                    <a href={link.url} target="_blank" className="text-primary underline">{link.url.slice(0,20)}...</a>
                  </div>
              </Tooltip>
                    <div className="flex gap-4">
                    
                  <div className="flex gap-2">

                    {
                      link.tags?.map((tag, i) => {
                        return (
                            <div key={i+tag} className="px-2 p-1 rounded-xl border-primary border bg-white font-semibold text-sm flex gap-2 items-center">
                              <p>{tag}</p>
                            </div>
                        );
                      })
                    }

                    
                    
                    </div>

                  <div className="flex gap-4 items-center">
                    <NewLinkDailogResourceForm
                      data={link}
                      linkGroupIndex={index}
                      linkIndex={i}
                      isEdit
                    >
                      <Tooltip title="Edit link details">
                          <FaEdit size={20} />
                      </Tooltip>
                    </NewLinkDailogResourceForm>

                    <Tooltip title="Delete link">
                      <button type="button" onClick={() => DeleteLink(i)}>
                        <FaTrash className="text-destructive" />
                      </button>
                    </Tooltip>
                  </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}
    </section>
  );
}
