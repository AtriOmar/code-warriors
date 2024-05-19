// components/MyLineChart.tsx
"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, PointElement } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip);

const MyLineChart = ({ questions }) => {
  const labels = questions.map((question) => question.id);
  const data = questions.map((question) => question.views);

  return (
    <div className="max-w-[500px]">
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Question Views",
              data,
              backgroundColor: "purple",
              borderRadius: 10,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                title: function (context) {
                  let label = questions[context[0].dataIndex]?.title || "";

                  return label;
                },
              },
            },
          },
        }}
      />
      <p className="text-center font-medium">Question ID</p>
    </div>
  );
};
export default MyLineChart;
