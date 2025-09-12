import { useEffect, useState } from "react"
import EmojipickerPopup from "./EmojipickerPopup"
import Input from "./Input"
import { LoaderCircle } from "lucide-react";


const AddExpenseForm = ({ onAddExpense, categories}) => {
    const [loading,setLoading]=useState(false);
    const [expense,setExpense]=useState({
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
        setExpense({...expense,[key]:value});
    }
    const handleSubmit = async () =>{
      setLoading(true);
      try{
       await onAddExpense(expense);
      }
      finally{
        setLoading(false);
      }
    }
    useEffect(()=>{
     if(categories.length>0 && !expense.categoryId){
        setExpense((prev)=>({...prev,categoryId:categories[0].id}))
     }
    },[categories,expense.categoryId]);
  return (
    <div >
        <EmojipickerPopup icon={expense.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />
         <Input
        onChange={({target})=>handleChange("name",target.value)}
        value={expense.name}
        label="Expense Name"
        placeholder="e.g., food, travel, transportation.."
        type="text"
        />
        <Input
        onChange={({target})=>handleChange('categoryId',target.value)}
        value={expense.categoryId}
        label="Category"
        isSelect={true}
        options={categoryOptions}
        />

        <Input 
        value={expense.amount}
        onChange={({target})=>handleChange('amount',target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
        />
    
        <Input
        value={expense.date}
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
            className="add-btn add-btn-fill bg-blue-500 text-white p-2 rounded">
            {loading?(
                <>
                <LoaderCircle className="w-4 h-4 animate-spin"/>
                Adding...
                </>
            ):(
                <>
                Add Expense
                </>
            )}
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm
