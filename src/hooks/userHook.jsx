import { useContext, useEffect } from "react"
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";

const userHook = () => {
    const {user,setUser,clearUser}=useContext(AppContext);
    const navigate=useNavigate();
    useEffect(() => {
     if(user){
        return;
     }
     let isMounted=true;
     const fetchUserInfo = async () =>{
       try{
        const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
         if(isMounted && response.data){
            setUser(response.data);

         }

       }catch(error){
        console.log("Failed to fetch the user info",error);
        if(isMounted){
            clearUser();
            navigate("/login");
        }
       }
     }
     fetchUserInfo();
     return () =>{
        isMounted=false;
     }
    },[setUser,clearUser,navigate]);
  return (
    <div>
      
    </div>
  )
}

export default userHook
