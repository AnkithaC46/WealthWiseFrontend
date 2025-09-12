import { useEffect, useState } from "react";
import { prepareExpenseLineChart } from "../util/prepareExpenseLineChart.js";
import CustomLineChart from "./CustomeLineChart"; 
import { Plus } from "lucide-react";


const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const result = prepareExpenseLineChart(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]); 

  return (
   <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track Your Expenses over time and analyze your expense trends.
          </p>
        </div>
        <button
          onClick={onAddExpense}
          className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded"
        >
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="p-4 bg-white rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Expense Trends</h2>

        {chartData && chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <p className="text-center text-gray-500">
            No expense data available to display chart.
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpenseOverview
