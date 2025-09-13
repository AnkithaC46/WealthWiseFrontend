import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { User } from "lucide-react"
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "./ProfilePhotoSelector";

const Sidebar = ({activeMenu}) => {
  const {user} = useContext(AppContext);
  const [profilePhoto, setProfilePhoto]=useState(null);
  const navigate = useNavigate();
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-gray-900 border border-gray-300 shadow-md p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {user?.profileImageUrl ? (
            <img src={user?.profileImageUrl || ""} alt="profile image"  className="w-20 h-20 bg-slate-400 rounded-full "/>
            ): (
                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
            ) }
            <h5 className="text-white text-2xl font-medium leading-6">{user.fullName || ""}</h5>
        </div>
        {SIDE_BAR_DATA.map((item,index)=>(
            <button 
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={`w-full flex items-center text-white gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor:pointer  ${activeMenu == item.label ?"text-white btn-gradient ":""}`}>
             <item.icon className="text-xl text-white" />
             {item.label}
            </button>
        ))}
      
    </div>
  )
}

export default Sidebar
