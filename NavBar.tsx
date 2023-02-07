import { useEffect } from "react";
import { useBookStore } from "../store";
import axios from "axios";
import { UserData } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const NavBar = () => {
  const showCities = useBookStore((state) => state.cities);
  const updateDataCities = useBookStore((state) => state.updateCities);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "2011",
    "2012",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    const arr: string[] = [];
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      res.data.map((item: UserData) => {
        const {
          address: { city, street },
        } = item;

        arr.push(city + ", " + street);
      });
      console.log(res.data);
      updateDataCities(arr);
    });
  }, []);

  return (
    <div>
      {showCities.map((data, index) => (
        <div key={index}>{data}</div>
      ))}
      <Bar options={options} data={data} />
    </div>
  );
};

export default NavBar;
