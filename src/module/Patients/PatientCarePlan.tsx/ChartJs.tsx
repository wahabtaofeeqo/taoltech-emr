import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { ChartData, Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

type BloodPressureData = {
  day: string;
  systolic: number;
  diastolic: number;
};

type chartProps = {
  bloodPressureData: BloodPressureData[];
};

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientChart: React.FC<chartProps> = ({ bloodPressureData }) => {
  const [userData, setUserData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    if (bloodPressureData) {
      setUserData({
        labels: bloodPressureData.map((data) => data.day),
        datasets: [
          {
            label: "Systolic blood Pressure",
            data: bloodPressureData.map((data) => data.systolic),
            borderColor: "#D37B00",
            backgroundColor: "#D37B00",
            barThickness: 10,
          },
          {
            label: "Diastolic Blood Presure",
            data: bloodPressureData.map((data) => data.diastolic),
            borderColor: "#FAE22E",
            backgroundColor: "#FAE22E",
            barThickness: 10,
          },
        ],
      });
    }
  }, [bloodPressureData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weekly',
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Blood Pressure (mmHg)",
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 150,
        ticks: {
          stepSize: 10,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    layout: {
      padding: {
        left: 6 / 2,
        right: 6/ 2,
      },
    },
  };

  return (
    <div className="h-full">
      {userData ? (
        <Bar data={userData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientChart;
