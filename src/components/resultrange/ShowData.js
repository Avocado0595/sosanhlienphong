import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
class ShowData extends Component {
  render() {
    const options = {
      legend: {
        display: false,
        position: "chartArea"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    const data = {
      labels: this.props.data.map((item) => item.idPTN),
      datasets: [
        {
          backgroundColor: this.props.data.map((item) => {
            return Math.abs(item.zcore) <= 2 ? "#3e95cd" : "#FF4E36";
          }), //['#3e95cd','#FF4E36'],
          label: "z-core",
          data: this.props.data.map((item) => item.zcore),
          borderWidth: 1
        }
      ]
    };
    return (
      <>
        <div className="header">
          <h1 className="title">Biểu đồ kết quả</h1>
        </div>
        <Bar height={100} data={data} options={options} />
      </>
    );
  }
}

export default ShowData;
/*
/* {({ resultData }) => {
                   
                    if (resultData) {
                        let sortData = resultData.sort((a,b)=>a.result - b.result)
                        let processData = new ProcessData();
                        let {avg, rsd} = processData.calc(resultData.map((item)=>
                        item.result
                        ));
                        
                        let dataset = sortData.map((item) => {
                            return {
                                idPTN: item.idPTN,
                                result: Number(item.result).toFixed(2),
                                zcore: Number((item.result - avg) / rsd).toFixed(2)
                            }
                        }
                        );
                        const data = {
                            
                            labels: sortData.map((item)=>item.idPTN),
                            datasets: [
                              {
                                backgroundColor: ['#3e95cd','#FF4E36'],
                                label: "z-core",
                                data: dataset.map((item)=>item.zcore),
                                borderWidth: 1,
                                
                              }
                            ]
                          };

                          return(
                            <>
                            <div className="header">
                              <h1 className="title">Biểu đồ kết quả</h1>
                            </div>
                            <Bar height={100} data={data} options={options} />
                          </>
                          )
                          
                    }
                 

                }
                } */
