import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RiskChart({ risk }) {
  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          risk.high,
          risk.medium,
          risk.low,
        ],
        backgroundColor: [
          "#ff4d4f",
          "#faad14",
          "#52c41a",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "30px auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default RiskChart;