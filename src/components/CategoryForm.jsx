import { useEffect, useState } from "react"
import Input from './Input.jsx';
import EmojipickerPopup from "./EmojipickerPopup.jsx";
import { LoaderCircle } from "lucide-react";
const CategoryForm = ({onAddCategory,initialCategoryData,isEditing}) => {
    const [category,setCategory]=useState({
        name:"",
        type:"income",
        icon:""
    })
    const [loading,setLoading]=useState(false);
    const categoryTypeOptions=[
        {value:"income", label:"Income"},
        {value:"expense", label:"Expense"}
    ]
    const handleChange =(key,value) =>{
        setCategory({...category,[key]:value})
    }
    const handleSubmit = async () =>{
      setLoading(true);
      try{
       await onAddCategory(category);
      }
      finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      if(isEditing && initialCategoryData){
        setCategory(initialCategoryData);
      }
      else{
        setCategory({name:"",type:"income",icon:""});
      }
    },[isEditing,initialCategoryData]);

  return (
    <div className="p-4 ">
        <EmojipickerPopup icon={category.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />
        <Input
        onChange={({target})=>handleChange("name",target.value)}
        value={category.name}
        label="Category Name"
        placeholder="e.g., freelance, salary, shopping"
        type="text"
        />
       <Input
        onChange={({target})=>handleChange("type",target.value)}
        value={category.type}
        label="Category Type"
        isSelect={true}
        options={categoryTypeOptions}

        />
        <div className="flex justify-end mt-6">
            <button 
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="add-btn add-btn-fill bg-blue-500 text-white p-2 rounded">
            {loading?(
                <>
                <LoaderCircle className="w-4 h-4 animate-spin"/>
                {isEditing?"Updating...":"adding..."}
                </>
            ):(
                <>
                {isEditing?"Update Category":"Add Category"}
                </>
            )}
            </button>
        </div>
    </div>
  )
}

export default CategoryForm
