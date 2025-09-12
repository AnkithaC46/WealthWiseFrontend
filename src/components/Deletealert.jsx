import { LoaderCircle } from "lucide-react";
import { useState } from "react"

const Deletealert = ({content,onDelete}) => {
    const [loading,setLoading]=useState(null);
    const handleDelete=async()=>{
        setLoading(true);
        try{
           await onDelete();
        }
        finally{
          setLoading(false);
        }
    }
  return (
    <div>
      <p className="text-sm text-white">
        {content}
        </p>
        <div className="flex justify-end mt-6">
            <button 
            disabled={loading}
            onClick={handleDelete}
            type="button"
            className="add-btn add-btn-fill bg-red-500 rounded p-3 text-white flex items-center gap-1">
            {
                loading?(
                   <>
                   <LoaderCircle className="h-4 w-4 animated-spin"/>Deleting...
                   </>
                ):(
                    <>
                    Delete
                    </>

                )
            }
           
            </button>
        </div>
    </div>
  )
}

export default Deletealert
