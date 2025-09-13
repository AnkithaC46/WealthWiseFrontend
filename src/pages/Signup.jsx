import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import Input from '../components/Input.jsx';
import { Link } from "react-router-dom";
import { validateEmail } from '../util/validation.js';
import { LoaderCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import axiosConfig from '../util/axiosConfig.js';
import toast from "react-hot-toast";
import ProfilePhotoSelector from '../components/ProfilePhotoSelector.jsx';
import uploadProfileImage from '../util/uploadProfileImage.js';




const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const[isLoading,setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto]=useState(null);
  const navigate = useNavigate();

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let profileImageUrl="";
    setIsLoading(true);
    if(!fullName.trim()){
      setError("Please enter your fullname");
       setIsLoading(false);
      return;
    }
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
      if(profilePhoto){
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl=imageUrl || "";

      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      if(response.status === 201){
        toast.success("Profile created successfully");
        navigate("/login");
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
    <div className="h-screen bg-main w-full relative flex justify-center items-center overflow-hidden">
      <img src={assets.logo} alt="logo"   className="absolute top-4 left-4 w-16 h-16 z-20"/>
     {/* <img src={assets.login_bg} alt="background" className='absolute inset-0 w-full h-full object-cover filter  ' /> */}
 
     
     <div className="relative z-10 w-full max-w-lg px-6">
      
      <div className="transparent bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        
        <h3 className="text-2xl font-semibold text-white text-center mb-2">
          Create an account
        </h3>
        <p className="text-sm text-slate-300 text-center mb-8">
          Start tracking your expenses today!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
           </div>
           <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter Full Name"
               type="text"
              />

              <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
               type="email"
              />

               <div className="col-span-2">
                
                <Input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*********"
               type="password"
              />
             
               </div>
              
           </div>
            {error && (
              <p className="text-red-500 text-sm text-center  p-2 rounded">
                {error}
              </p>
           
            )}
            <button disabled={isLoading} className={`btn-gradient rounded-full text-white w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading?'opacity-60 cursor-not-allowed':''}`} type="submit">
               {isLoading ? (
                 <>
                 <LoaderCircle className='animate-spin w-5 h-5'/>
                 Signing Up...
                 </>
               ):(
                 "Sign up"
               )
               }
            </button>
            <p className="text-sm text-slate-300 text-center mt-6">
              Already have an account?
              <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1">Login</Link>
            </p>
        </form>
        </div>
      </div>
     </div>
 
  )
}

export default Signup
