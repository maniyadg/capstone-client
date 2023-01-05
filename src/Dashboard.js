import { faBold } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from "react";

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Dashboard() {


  const [chart, setChart] = useState([])
  var baseUrl = "http://localhost:3001/admin/items/products";




  useEffect(() => {
    const productData = async () => {
      try {
          const products = await axios.get(`${baseUrl}`, {
              headers: {
                  Authorization: localStorage.getItem("Inventory_billing_app"),
              },
          });
          setChart(products.data);
      } catch (error) {
          alert("Some thing went wrong");
      }
  };
    productData()

}, [baseUrl]);



  console.log("chart", chart);
  console.log(chart.products);
  var data = {
    labels: chart?.map(x => x.name),
    datasets: [{
      label: `${chart?.length} Models of Mobile Phone's Available`,
      data: chart?.map(x => x.qty),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
        fontWeight: faBold,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        height={400}
        width={300}
        options={options}

      />
    </div>
  )
}

export default Dashboard;

// url parameters
// query parameters