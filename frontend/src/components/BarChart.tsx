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

const data = [
  {
    name: "Galle",
    total: Math.floor(Math.random() * 5000) + 1000
  },

  {
    name: "Kegalle",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kandy",
    total: Math.floor(Math.random() * 5000) + 1000
  },

  {
    name: "Anuradhapura",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  

  {
    name: "Badulla",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  
  {
    name: "Hambantota",
    total: Math.floor(Math.random() * 5000) + 1000
  }
 
];

export default function BarChart({}: Props) {
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
