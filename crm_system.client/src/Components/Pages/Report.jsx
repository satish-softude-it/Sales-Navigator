import { CChart } from "@coreui/react-chartjs";
import { Width } from "devextreme-react/cjs/chart";
import React from "react";

const Report = () => {
  return (
    <div className="w-50" style={{border:'1px solid red', }}>
      <CChart
        type="doughnut"
        data={{
          labels: ["Sales", "Support", "Success", "Issues"],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: [40, 20, 80, 10],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#000000", // Set a default color or use any CSS color value
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Report;
