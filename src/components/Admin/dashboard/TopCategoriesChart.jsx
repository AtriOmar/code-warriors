// components/MyLineChart.tsx
"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, PointElement, Title, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Title, Legend);

const TopCategoriesChart = ({ categories }) => {
  const labels = categories.map((category) => category.id);
  const questionsData = categories.map((category) => category.questionsCount);
  const data2 = categories.map((category) => category.answersCount);

  return (
    <div className="max-w-[500px]">
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Questions",
              data: questionsData,
              backgroundColor: "purple",
              borderRadius: 10,
            },
            {
              label: "Answers",
              data: data2,
              backgroundColor: "#cc00cc",
              borderRadius: 10,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                title: function (context) {
                  let label = categories[context[0].dataIndex]?.name || "";

                  return label;
                },
              },
            },
          },
        }}
      />
      <p className="text-center font-medium">Category ID</p>
    </div>
  );
};
export default TopCategoriesChart;
