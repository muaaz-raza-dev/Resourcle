import React, { forwardRef, useState } from 'react';

// eslint-disable-next-line react/display-name
const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div className="flex w-full">
      <input 
        id="password"
        ref={ref}
        type={!toggle ? "password" : "text"}
        placeholder="Enter password"
        className="focus:outline-none outline-none h-9 text-sm border-none placeholder:text-sm w-full px-2"
        {...props}
      />
      <button 
        className="text-xs hover:underline font-semibold pr-2 text-primary" 
        type="button" 
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? 'hide' : 'show'}
      </button>
    </div>
  );
});

export default PasswordInput;
