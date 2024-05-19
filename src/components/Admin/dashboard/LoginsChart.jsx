import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate } from "@/lib/formatDate";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function LoginsChart({ logins }) {
  const loginsData = logins.map((login) => login.count);
  const labels = logins.map((login) => formatDate(login.minute, "time"));

  const data = {
    labels,
    datasets: [
      {
        label: "Logins",
        data: loginsData,
        // pointBorderColor: "transparent",
        // pointBackgroundColor: "transparent",
        borderColor: "purple",
        backgroundColor: "purple",
        tension: 0.2,
      },
    ],
  };
  return (
    <div className="max-w-[500px]">
      <Line options={options} data={data} />
    </div>
  );
}
