import Dashboard from './Dashboard'
import userHook from '../hooks/userHook'
import  { useState,useEffect } from 'react'
import ExpenseList from '../components/ExpenseList'
import toast from 'react-hot-toast'
import axiosConfig from '../util/axiosConfig'
import { API_ENDPOINTS } from '../util/apiEndpoints'
import Modal from "../components/Modal";
import AddExpenseForm from '../components/AddExpenseForm'
import Deletealert from '../components/Deletealert'
import ExpenseOverview from '../components/ExpenseOverview'
const Expense = () => {
  userHook();
    userHook();
  const [expenseData,setExpenseData]=useState([]);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
       show:false,
       data:null,
  })
 const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
      if (response.status === 200) {
        console.log(response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
   const fetchExpenseCategories = async()=>{
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if(response.status === 200){
        console.log(response.data);
        setCategories(response.data);
      }
    }
    catch(error){
      toast.error(error.data?.message || "Failed to fetch fetch categories");
    }
   }
  
  const handleAddExpense=async(expense)=>{
       const {name,amount,date,icon,categoryId}=expense;
       if(!name.trim()){
        toast.error("Please enter a name");
        return;
       }
       if(!amount || isNaN(amount) || Number(amount)<=0 ){
        toast.error("Enter a valid amount");
        return ;
       }
       if(!date){
        toast.error("Please select a date");
        return;
       }
       const today = new Date().toISOString().split('T')[0];
       if(date > today){
         toast.error("date cannot be in the future");
         return ;
       }
       if(!categoryId){
        toast.error("Please select a category");
       }
      

       try{
        const response =  await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE,{
          name,
          amount:Number(amount),
          date,
          icon,
          categoryId,
          });
        if(response.status === 201){
          toast.success("Expense added successfully")
          setOpenAddExpenseModel(false)
          fetchExpenseDetails();
          fetchExpenseCategories();

        }
       }catch(error){
        toast.error(error.response?.data?.message || "something went wrong! please try again");
       }finally{
        setLoading(false);
       }
  } 
  const deleteExpense = async(id)=>{
   
    try{
     await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
     setOpenDeleteAlert({show:false,data:null});
     toast.success("Expense deleted successfully");
     fetchExpenseDetails();
    }catch(error){
      toast.error("Something went wrong! Please try again later");
    }
  }

  const handleDownloadExpenseDetails=async()=>{
  
    try{
        const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:"blob"});
        let filename="expense_details.xlsx";
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute("download",filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Downloaded expense details successfully");
    }
    catch(error){
      toast.error("Failed to download the expense");
      
    }
    

  }
  const handleEmailExpenseDetails=async()=>{
    try {
      const response =await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if(response.status === 200){
        toast.success("Expense details emailed successfully")
      }
    } catch (error) {
      toast.error("Failed to email expense")
    }
  }

useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);



  return (
     <Dashboard activeMenu="Expense">
        <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
           <div>
            
            <ExpenseOverview
            transactions={expenseData}
            onAddExpense={()=>setOpenAddExpenseModel(true)}
            />
           </div>
           
           <ExpenseList 
           onDownload={handleDownloadExpenseDetails}
           onEmail={handleEmailExpenseDetails}
           transactions={expenseData}
            onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
           />
           <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm 
          onAddExpense={handleAddExpense}
          categories={categories}
          />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false,data:null})}
          title="Delete Expense"
        >
          <Deletealert
          content={"Are you sure want to delete this expense details?"}
          onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
        </div>
        </div>
  
      </Dashboard>
  )
}

export default Expense
