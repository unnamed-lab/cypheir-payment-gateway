"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "SOL", value: 45, color: "#00FFA3" },
  { name: "USDC", value: 30, color: "#2775CA" },
  { name: "BONK", value: 15, color: "#F6A43C" },
  { name: "USDT", value: 10, color: "#26A17B" },
]

export function TokenDistribution() {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Percentage"]}
            contentStyle={{
              backgroundColor: "rgba(17, 17, 17, 0.8)",
              borderRadius: "6px",
              border: "none",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

