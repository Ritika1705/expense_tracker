import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useState, useEffect } from "react";
import Navbar from "./Navbar";  

function Transaction() {


  const[travel_amt,set_travel_amt] = useState();
  const[food_amt, set_food_amt] = useState();
  const[accessories_amt, set_accessories_amt] = useState();
  const[gadget_amt, set_gadget_amt] = useState();
  const[other_amt, set_other_amt] = useState();

  useEffect(() => {
    //alert("hello");
    // Update the document title using the browser API
    let travel_expense = fetch('http://localhost:4000/travel_expense').then(function(response) {
            return response.text();
          }).then(function(data) {
            parseInt(data);
            console.log(data); // this will be a string
            set_travel_amt(data);
    });

    let food_expense = fetch('http://localhost:4000/food_expense').then(function(response) {
            return response.text();
          }).then(function(data) {
            parseInt(data);
            console.log(data); // this will be a string
            set_food_amt(data);
    });

    let accessories_expense = fetch('http://localhost:4000/accessories_expense').then(function(response) {
            return response.text();
          }).then(function(data) {
            parseInt(data);
            console.log(data); // this will be a string
            set_accessories_amt(data);
    });

    let gadget_expense = fetch('http://localhost:4000/gadget_expense').then(function(response) {
            return response.text();
          }).then(function(data) {
            parseInt(data);
            console.log(data); // this will be a string
            set_gadget_amt(data);
    });

    let other_expense = fetch('http://localhost:4000/other_expense').then(function(response) {
            return response.text();
          }).then(function(data) {
            parseInt(data);
            console.log(data); // this will be a string
            set_other_amt(data);
    });

  });

  return (
    <body className='debit_page home_body'>
        <Navbar />
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            
            labels: ["Travel", "Food", "Accessories", "Gadgets", "Others"],
            title:{
                text: "Index Labels with Big Fonts"
              },
            datasets: [
              {
                // Label for bars
                label: ["total count/value"],
                indexLabelFontSize: 26,
                // Data or value of your each variable
                data: [travel_amt, food_amt, accessories_amt, gadget_amt, other_amt],
                // Color of each bar
                backgroundColor: ["#0FF39E"],
                // Border color of each bar
                borderColor: ["07B022"],
                barThickness: 80,
                borderWidth: 2,
              },
            ],
          }}
          // Height of graph
          height={30}
          width={60}
          options={{
            responsive: true,
            layout: {
               padding: {
                  left: 40,
                  right: 40,
               },
               plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 140
                        }
                    }
                }
            }
            },
            scales: {
                x: {
                
                  grid: {
                    offset: false,
                    display: false
                  },
                  border: {
                    color: 'white'
                  },
                  ticks: {
                    color: "white",
                    font: {
                        size: 20,
                    }
                    }
                },
                y: {
                  grid: {
                    display: false,
                  },
                  border: {
                    color: 'white'
                  },
                  ticks: {
                    color: "white",
                    font: {
                        size: 20,
                    }
                    }
                }
              }
         
          }}
        />
      </body>

  );
}
  
export default Transaction;