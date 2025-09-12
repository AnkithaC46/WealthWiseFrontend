import React, { useState,useEffect } from 'react'
import Dashboard from './Dashboard'
import userHook from '../hooks/userHook'
import IncomeList from '../components/IncomeList'
import toast from 'react-hot-toast'
import axiosConfig from '../util/axiosConfig'
import { API_ENDPOINTS } from '../util/apiEndpoints'
import Modal from "../components/Modal";
import { Plus } from 'lucide-react'
import AddIncomeForm from '../components/AddIncomeForm'
import Deletealert from '../components/Deletealert'
import IncomeOverview from '../components/IncomeOverview'
const Income = () => {
  userHook();
  const [incomeData,setIncomeData]=useState([]);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
       show:false,
       data:null,
  })
 const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log(response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
   const fetchIncomeCategories = async()=>{
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if(response.status === 200){
        console.log(response.data);
        setCategories(response.data);
      }
    }
    catch(error){
      toast.error(error.data?.message || "Failed to fetch income categories");
    }
   }
  
  const handleAddIncome=async(income)=>{
       const {name,amount,date,icon,categoryId}=income;
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
        const response =  await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
          name,
          amount:Number(amount),
          date,
          icon,
          categoryId,
          });
        if(response.status === 201){
          toast.success("Income added successfully")
          setOpenAddIncomeModel(false)
          fetchIncomeDetails();
          fetchIncomeCategories();

        }
       }catch(error){
        toast.error(error.response?.data?.message || "something went wrong! please try again");
       }finally{
        setLoading(false);
       }
  } 
  const deleteIncome = async(id)=>{
   
    try{
     await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
     setOpenDeleteAlert({show:false,data:null});
     toast.success("Income deleted successfully");
     fetchIncomeDetails();
    }catch(error){
      toast.error("Something went wrong! Please try again later");
    }
  }

  const handleDownloadIncomeDetails=async()=>{
  
    try{
        const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
        let filename="income_details.xlsx";
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute("download",filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Download income details successfully");
    }
    catch(error){
      toast.error("Failed to download the income");
      
    }
    

  }
  const handleEmailIncomeDetails=async()=>{
    try {
      const response =await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status === 200){
        toast.success("Income details emailed successfully")
      }
    } catch (error) {
      toast.error("Failed to email income")
    }
  }

useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);





  return (
      <Dashboard activeMenu="Income">
        <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
           <div>
            
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={()=>setOpenAddIncomeModel(true)}
            />
           </div>
           <IncomeList 
           onDownload={handleDownloadIncomeDetails}
           onEmail={handleEmailIncomeDetails}
           transactions={incomeData}
            onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
           />
           <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm 
          onAddIncome={handleAddIncome}
          categories={categories}
          />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show:false,data:null})}
          title="Delete Income"
        >
          <Deletealert
          content={"Are you sure want to delete this income details?"}
          onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
        </div>
        </div>
      </Dashboard>
  )
}

export default Income
