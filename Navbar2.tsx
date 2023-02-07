import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
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

const NavBar2 = () => {
  const [dataYear, setDataYear] = useState<any[]>([]);
  const [dataValue, setDataValue] = useState<{
    cityOne: any[]
    cityTwo: any[]
  }>({cityOne:[], cityTwo:[]});
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
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

  const labels = dataYear;

  const data = {
    labels,
    datasets: [
      {
        label: "cityOne",
        data: dataValue.cityOne,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "cityTwo",
        data: dataValue.cityTwo,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

 
  const url = "https://countriesnow.space/api/v0.1/countries/population/cities/filter";

  const FilterTeritory = async (url: string) => {
    await axios
      .post(url, {
        limit:2,
      })
      .then((res) => {
        console.log(res)
        const {populationCounts} = res.data.data
        const cityOne: any[]=[];
        const cityTwo: any[]=[];

        const year: any[] = [];
        const values: any[] = [];

        populationCounts.map((item: any) =>{
          year.push(item.year);
          values.push(item.values)
        });

        setDataYear(year);
        setDataValue({ cityOne, cityTwo })

      })
      .catch();
  };
  useEffect(() => {
    FilterTeritory(url);
  }, []);

  return (
    <div>
    <div>
      {dataYear.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <div>Please wait....</div>
      )}
    </div>
    <div>
    {dataValue.cityOne.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <div>Please wait....</div>
      )}
    </div>
    </div>
  );
};

export default NavBar2;

