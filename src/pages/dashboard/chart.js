import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const PureComponent = ({ value, colors, size }) => {
  //   const demoUrl = "https://codesandbox.io/s/simple-radial-bar-chart-qf8fz";

  const data = [
    {
      name: "40-49",
      uv: value,
      pv: 100 - 8.63,
      fill: colors,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius={size}
        outerRadius="80%"
        barSize={10}
        data={data}
      >
        <RadialBar
          label={{ position: "insideStart", fill: "#fff" }}
          background
          clockWise
          dataKey="uv"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
export default PureComponent;
