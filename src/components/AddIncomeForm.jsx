import { useEffect, useState } from "react"
import EmojipickerPopup from "./EmojipickerPopup"
import Input from "./Input"
import { LoaderCircle } from "lucide-react";


const AddIncomeForm = ({ onAddIncome, categories}) => {
    const [loading,setLoading]=useState(false);
    const [income,setIncome]=useState({
         name:'',
         amount:'',
         date:'',
         icon:'',
         categoryId:''
    })
    const categoryOptions = categories.map(category => ({
        value:category.id,
        label:category.name,
    }))
      const handleChange =(key,value) =>{
        setIncome({...income,[key]:value});
    }
    const handleSubmit = async () =>{
      setLoading(true);
      try{
       await onAddIncome(income);
      }
      finally{
        setLoading(false);
      }
    }
    useEffect(()=>{
     if(categories.length>0 && !income.categoryId){
        setIncome((prev)=>({...prev,categoryId:categories[0].id}))
     }
    },[categories,income.categoryId]);
  return (
    <div >
        <EmojipickerPopup icon={income.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />
         <Input
        onChange={({target})=>handleChange("name",target.value)}
        value={income.name}
        label="Income Source"
        placeholder="e.g., freelance, salary, bonus"
        type="text"
        />
        <Input
        onChange={({target})=>handleChange('categoryId',target.value)}
        value={income.categoryId}
        label="Category"
        isSelect={true}
        options={categoryOptions}
        />

        <Input 
        value={income.amount}
        onChange={({target})=>handleChange('amount',target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
        />
    
        <Input
        value={income.date}
        onChange={({target})=>handleChange('date',target.value)}
        label="Date"
        placeholder=""
        type="date"


        />
        
        <div className="flex justify-end mt-6">
            <button 
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="add-btn add-btn-fill btn-gradient text-white p-2 rounded">
            {loading?(
                <>
                <LoaderCircle className="w-4 h-4 animate-spin"/>
                Adding...
                </>
            ):(
                <>
                Add Income
                </>
            )}
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
