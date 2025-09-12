
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  return (
    <div style={{ width: 300, height: 300, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {/* ✅ Tooltip for hover/click details */}
          <Tooltip
            formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-xl font-bold">{totalAmount}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
