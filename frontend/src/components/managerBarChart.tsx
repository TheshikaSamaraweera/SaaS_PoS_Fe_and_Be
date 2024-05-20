/** @format */
"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";

type Props = {};
const data = Array.from({ length: 12 }, (_, i) => ({
  name: `${i + 8}:00`,
  total: Math.floor(Math.random() * 5000) + 1000
}));



export default function ManagerBarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
