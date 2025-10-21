import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", activity: 40 },
  { month: "Feb", activity: 300 },
  { month: "Mar", activity: 200 },
  { month: "Apr", activity: 28 },
  { month: "Jun", activity: 23 },
  { month: "Jul", activity: 349 },
  { month: "Aug", activity: 39 },
  { month: "Sept", activity: 149 },
  { month: "Oct", activity: 549 },
  { month: "Nov", activity: 10 },
  { month: "Dec", activity: 50 },
];

const AppointmentStatus = () => {
  return (
    <div className="w-full min-h-[200px]">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[#020714]">Patient Demographics</h4>
        <div>Last 30 days</div>
      </div>
      <BarChart
        width={500}
        height={200}
        data={data}
        style={{ width: "100%" }}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Bar dataKey="activity" fill="#1992D4" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "5px",
            border: "none",
            boxShadow: "2px 2px 2px 1px rgb(0 0 0 / 20%)",
            fontSize: "10px",
          }}
          itemStyle={{ fontStyle: "bold" }}
          labelStyle={{ fontStyle: "bold" }}
        />
      </BarChart>
    </div>
  );
};

export default AppointmentStatus;
