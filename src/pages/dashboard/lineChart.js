import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineChartComponent = ({ chartData }) => {
  const data = [
    {
      name: "TotalWorkspace",
      workSpace: chartData?.totalWorkSpace,
      amt: chartData?.totalWorkSpace + 5,
    },
    {
      name: "TaskDeployer",
      workSpace: chartData?.TASK,
      amt: chartData?.totalWorkSpace + 5,
    },
    {
      name: "CxDeployer",
      workSpace: chartData?.CX,
      amt: chartData?.totalWorkSpace + 5,
    },
    {
      name: "Ideadeployer",
      workSpace: chartData?.IDEA,
      amt: chartData?.totalWorkSpace + 5,
    },
    {
      name: "FormDeployer",
      workSpace: chartData?.FORM,
      amt: chartData?.totalWorkSpace + 5,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line
          type="monotone"
          dataKey="workSpace"
          stroke="#FF004C"
          activeDot={{ r: 8 }}
        />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
