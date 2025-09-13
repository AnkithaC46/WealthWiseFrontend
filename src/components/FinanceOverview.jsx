import { addThousandsSeparator } from "../util/addThousandsSeparator";
import CustomPieChart from './CustomPieChart';
const FinanceOverview = ({totalBalance, totalIncome,totalExpense}) => {
    const COLORS=["#00008b", "#a0090e","#016630"];
    const balanceData=[
        {name:"Total Balance", amount:totalBalance},
        {name:"Total Expense", amount:totalExpense},
        {name:"Total Income", amount:totalIncome}
    ]
  return (
    <div className="card">
        <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-semibold"> Finacial Overview</h5>
        </div>
        <div className="flex justify-center items-center">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  )
}

export default FinanceOverview
