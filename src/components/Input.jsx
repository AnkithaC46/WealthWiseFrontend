import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const input = ({ label, value, onChange, placeholder, type,isSelect, options }) => {

  const[showPassword,setShowPassword] = useState(false);
  const toggleShowPassword =()=>{
    setShowPassword(!showPassword);
  }
  return (
    <div className="mb-4">
      <label className="text-[13px] block text-slate-200 mb-2">{label}</label>
      <div className="relative">
       {isSelect?(
        <select className="w-full  outline-none border border-gray-900 rounded-md py-2 px-3 text-white leading focus:outline-none focus:border-blue-500"
          value={value}
          onChange={(e)=>onChange(e)}
        >
          {options.map((option)=>(
           <option className="bg-black" key={option.value} value={option.value}>
            {option.label}
           </option>
          ))}
        </select>

       ):(
         <input
        className=" w-full bg-transparent oultine-none border border-gray-900 rounded-md px-3 py-2 pr-10 text-gray-200 leading-tight focus:outline-none focus:border-blue-500 transition-colors"
          type={type === 'password' ? (showPassword ? 'text':'password'):type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          
        />
       )}
        {type ==='password' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ">
            {showPassword?(
              <Eye
              size={20}
              className="text-white"
              onClick={toggleShowPassword}
              />):(
                <EyeOff
                size={20}
                className="text-white"
                 onClick={toggleShowPassword}
                />    
            )} 
          </span>
        )}
      </div>
    </div>
  );
};

export default input;
