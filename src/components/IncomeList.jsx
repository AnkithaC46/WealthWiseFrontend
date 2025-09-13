import { Download, Mail, LoaderCircle } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";

import moment from "moment";
import { useState } from "react";
const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);
  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={loading}
            onClick={handleEmail}
            className="flex items-center gap-2 bg-purple-200 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-purple-400"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="text-purple-800" />
                Email
              </>
            )}
            
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-purple-200 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-purple-400"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-purple-800" />
                Download
              </>
            )}
            
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
