import moment from "moment";

export const prepareIncomeLineChartData = (incomeData) => {
  if (!incomeData || incomeData.length === 0) {
    return [];
  }

  const dailyIncome = incomeData.reduce((acc, income) => {
    const date = moment(income.date).format("YYYY-MM-DD"); 
    if (!acc[date]) {
      acc[date] = {
        totalAmount: 0,
        details: []
      };
    }

    acc[date].totalAmount += Number(income.amount);
    acc[date].details.push({
      title: income.name,
      amount: income.amount
    });

    return acc;
  }, {});

  const sortedDates = Object.keys(dailyIncome).sort(
    (a, b) => moment(a).valueOf() - moment(b).valueOf()
  );

  return sortedDates.map((date) => ({
    date: moment(date).format("MMM DD"),   // x-axis label
    fullDate: date,                        // original date
    amount: dailyIncome[date].totalAmount, // total per date
    details: dailyIncome[date].details     // list of incomes for that date
  }));
};
