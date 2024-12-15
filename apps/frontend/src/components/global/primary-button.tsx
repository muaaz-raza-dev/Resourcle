import React from 'react'
export default function PrimaryButton(props:React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
<button {...props}  className="px-4 py-2 rounded-md border bg-accent  font-semibold  text-sm hover:brightness-90 text-white transition-all   primaryShadow" >
{props.children}  
</button>

  )
}
