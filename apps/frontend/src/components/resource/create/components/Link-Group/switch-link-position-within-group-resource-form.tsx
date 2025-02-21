import React from 'react'

export default function SwitchLinkPositionWithinGroupResourceForm({linkIndex}:{linkIndex:number}) {
  return (
    <section className="flex" key={linkIndex}>
    <button
    type="button"
    className="`relative aspect-square  md:text-xs text-sm font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2"
  >
    
  </button>
    </section>
  )
}
