import React from 'react'
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import Input from '../components/Input.jsx';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext.jsx';
import { LoaderCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import axiosConfig from '../util/axiosConfig.js';
import { validateEmail } from '../util/validation.js';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const[isLoading,setIsLoading] = useState(false);
    const {setUser}  = useContext(AppContext)
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    if(!validateEmail(email)){
      setError("Please enter valid email");
      setIsLoading(false);
      return;
    }
    if(!password.trim()){
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");
    try{
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
        email,
        password,
      })
      const {token,user} =response.data;
      if(token){
        localStorage.setItem("token",token);
        setUser(user);
        navigate("/dashboard");
      }
    }catch(err){
      if(err.response && err.response.data.message){
        setError(err.response.data.message);
      }
      else{
      console.error("something went wrong",err);
      setError(err.message);
      }

    }finally{
      setIsLoading(false);
    }
  }
  return (
     <div className="h-screen w-full relative flex justify-center items-center overflow-hidden bg-main">
            <img src={assets.logo} alt="logo"   className="absolute top-4 left-4 w-16 h-16 z-20"/>
      
     {/* <img src={assets.login_bg} alt="background" className='absolute inset-0 w-full h-full object-cover filter  ' /> */}
     <div className="relative z-10 w-full max-w-lg px-6">
      <div className="transparent bg-opacity-95 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.6)]  p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-white text-center mb-2">
          Welcome Back
        </h3>
        <p className="text-sm text-slate-300 text-center mb-8">
          Please enter your details to login
        </p>
        <form onSubmit={handleSubmit}  className="space-y-4"> 

              <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
               type="email"
              />

                
                <Input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*********"
               type="password"
              />
            
            {error && (
              <p className="text-red-500 text-sm text-center  p-2 rounded">
                {error}
              </p>
           
            )}
            <button disabled={isLoading} className={`bg-gradient-to-r from-blue-500 to-purple-700 rounded-full text-white rounded w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading?'opacity-60 cursor-not-allowed':''}`} type="submit">
               {isLoading ? (
                 <>
                 <LoaderCircle className='animate-spin w-5 h-5'/>
                 Logging in...
                 </>
               ):(
                 "Login"
               )
               }
            </button>
            <p className="text-sm text-slate-300 text-center mt-6">
              Don't have an account?
              <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1">Sign Up</Link>
            </p>
        </form>
      </div>
     </div>
    </div>
  )
}

export default Login
