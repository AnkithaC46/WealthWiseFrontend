
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const details = payload[0].payload.details || []; 

    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-bold mb-1">{label}</p>
        <hr className='text-gray-500'/>
        <p className="text-sm mt-1 mb-1 font-semibold">Total: {payload[0].value}</p>
        <hr className='text-gray-500'/>
        <ul className="list-decimal pl-4 text-sm mt-1">
          {details.map((item, idx) => (
            <li key={idx} className=''>
              {item.title}: {item.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
  <AreaChart
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <defs>
      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="20%" stopColor="#45077bff" stopOpacity={1} />  {/* purple top */}
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.3} /> {/* fades to white */}
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />

    <Area
      type="monotone"
      dataKey="amount"
      stroke="#7e22ce"  // purple border line
      fill="url(#purpleGradient)" // use gradient
      activeDot={{ r: 8 }}
    />
  </AreaChart>
</ResponsiveContainer>

  );
};

export default CustomLineChart;
