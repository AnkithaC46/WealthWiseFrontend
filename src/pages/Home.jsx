import { TrendingDown, TrendingUp, Wallet2Icon, WalletCards } from "lucide-react";
import InfoCard from "../components/InfoCard";
import userHook from "../hooks/userHook"
import Dashboard from "./Dashboard"
import { addThousandsSeparator } from "../util/addThousandsSeparator";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";



const Home = () => {
  userHook();
  const navigate=useNavigate();
  const [dashboardData, setDashboardData]=useState(null)
  const [loading,setLoading]=useState(false);

  const fetchDashboardData = async()=>{
    if(loading) return ;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if(response.status === 200){
        setDashboardData(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      
    }
  }
  useEffect(()=>{
    fetchDashboardData();
    return ()=>{};
  },[])
  
  return (
    <div>
      <Dashboard activeMenu="Dashboard">

        <div className="my-5 mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
            icon={<WalletCards/>}
            label={"Total Balance"}
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-blue-800"
            />
            <InfoCard
            icon={<TrendingUp/>}
            label={"Total Income"}
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-800"
            />
            <InfoCard
            icon={<TrendingDown/>}
            label={"Total Expense"}
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={()=>navigate("/expense")}
            />
             <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
            />
            <Transactions
            transactions={dashboardData?.recent5Expenses || []}
            onMore={()=>navigate("/expense")}
            type="expense"
            title="Recent Expenses"
             />
             <Transactions
            transactions={dashboardData?.recent5Incomes || []}
            onMore={()=>navigate("/income")}
            type="income"
            title="Recent Incomes"
             />

          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home
