import moment from "moment";

export const prepareExpenseLineChart = (expenseData) => {
  if (!expenseData || expenseData.length === 0) {
    return [];
  }

  const dailyExpense = expenseData.reduce((acc, expense) => {
    const date = moment(expense.date).format("YYYY-MM-DD"); 
    if (!acc[date]) {
      acc[date] = {
        totalAmount: 0,
        details: []
      };
    }

    acc[date].totalAmount += Number(expense.amount);
    acc[date].details.push({
      title: expense.name,
      amount: expense.amount
    });

    return acc;
  }, {});

  const sortedDates = Object.keys(dailyExpense).sort(
    (a, b) => moment(a).valueOf() - moment(b).valueOf()
  );

  return sortedDates.map((date) => ({
    date: moment(date).format("MMM DD"),   // x-axis label
    fullDate: date,                        // original date
    amount: dailyExpense[date].totalAmount, // total per date
    details: dailyExpense[date].details     // list of expenses for that date
  }));
};
