import React, { useState } from "react";
import Dashboard from "./Dashboard";
import userHook from "../hooks/userHook";
import { Search } from "lucide-react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  userHook();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
    } catch (error) {
      toast.error("Something went wrong! Please try agian later ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 max-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="card-2 p-4 mb-4  ">
          <div className="flex items-center justify-between mb-4 ">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 "
          >
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Type
              </label>
              <select
                id="type"
                value={type}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium mb-2"
              >
                Start Date
              </label>
              <input
                value={startDate}
                type="date"
                id="startdate"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="enddate"
                className="block text-sm font-medium mb-2"
              >
                End Date
              </label>
              <input
                value={endDate}
                type="date"
                id="enddate"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-2"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                id="sortorder"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortField"
                className="block text-sm font-medium mb-2"
              >
                Sort Field
              </label>
              <select
                value={sortField}
                id="sortField"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  Search
                </label>
                <input
                  value={keyword}
                  type="text"
                  id="keyword"
                  placeholder="Search..."
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500 "
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ml-2 mb-1 p-2 btn-gradient hover:bg-blue-800 text-white rounded flex items-center justify-center cursor-pointer "
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-lg font-semibold">Transactions</h5>
          </div>
          {transactions.length === 0 && !loading ? (
            <p className="text-gray-500">
              Select the filter and click search to filter the transactions
            </p>
          ) : (
            ""
          )}

          {loading ? <p className="text-gray-500">Loading transactions</p> : ""}

          {transactions.map((transaction, index) => (
            <TransactionInfoCard
              key={transaction.id}
              title={transaction.name}
              icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")}
              amount={transaction.amount}
              type={type}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
