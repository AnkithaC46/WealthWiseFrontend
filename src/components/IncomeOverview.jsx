
import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomeLineChart"; 
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]); 

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track Your Earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 p-2 btn-gradient text-white rounded"
        >
          <Plus size={15} className="text-lg" /> Add Income
        </button>
      </div>
      <div className="p-4 bg-white rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Income Trends</h2>

        {chartData && chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <p className="text-center text-gray-500">
            No income data available to display chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
