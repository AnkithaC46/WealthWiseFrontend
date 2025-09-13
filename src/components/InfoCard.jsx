const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className="flex gap-6  p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50 bg-purple-200">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white font-semibold ${color} rounded-full drop-shadow-xl`}>
         {icon}
        </div>
        <div>
            <h6 className="text-sm text-black font-semibold mb-1">{label}</h6> 
            <span className="text-[22px] font-semibold">&#8377;{value}</span>
        
        </div>

      
    </div>
  )
}

export default InfoCard
