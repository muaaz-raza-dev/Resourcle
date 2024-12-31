import { IResourceLink } from "../models/link.model.js";

export function CompareLink(
  remoteLink: IResourceLink,
  localLink: IResourceLink,
) {
  let isChanges = false;
  const LinkToUpdate: IResourceLink = localLink;
  const FieldsToExamine = [
    "title",
    "url",
    "description",
    "isPaid",
    "level_infomation",
  ];
  LinkToUpdate.upvotesDoc = remoteLink.upvotesDoc;
  LinkToUpdate.upvotes = remoteLink.upvotes;
  LinkToUpdate._id = remoteLink._id;
  LinkToUpdate.resource = remoteLink.resource;
  FieldsToExamine.forEach((field: string) => {
    if (
      remoteLink[field as keyof IResourceLink] !==
      localLink[field as keyof IResourceLink]
    ) {
      isChanges = true;
    }
  });
  return [isChanges, LinkToUpdate];
}
