import React from 'react'
import BannerResourceForm from './components/banner-resource-form'
import TitleDescriptionResournceForm from './components/title-description-resource-form'
import ContentResourceForm from './components/content-resource-form'
import ToolboxSelectResourceForm from './components/toolbox-select-resource-form'
import TagsResourceForm from './components/tags-resource-form'
import LinksOperationsResourceForm from './components/links-operations-resource-form'

export default function CreateResourceFormComponents({edit}:{edit?:boolean}) {
  return (
     <section className="flex flex-col gap-2 mb-4">
          <BannerResourceForm edit={edit} />
          <TitleDescriptionResournceForm />
          <LinksOperationsResourceForm edit={edit}/>
          <ContentResourceForm />
          <ToolboxSelectResourceForm />
          <TagsResourceForm/>
    </section>
  )
}
