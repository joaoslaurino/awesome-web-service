import ApexChart from 'react-apexcharts';
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Charts.css";

export default function Graphics() {

    const [interval, setInterval] = useState('365');
    const [data, setData] = useState([]);
    const [queryParameters] = useSearchParams();

    useEffect(() => {
        let id = queryParameters.get("id")
        console.log(id)
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${interval}`)
        .then(res => {
            setData(res.data.prices.map(v => {
                return [v[0], v[1].toFixed(2)]
            }))
        }).catch(error => console.log(error));
    }, [interval]);

    function handlerOnClick(interval) {
        setInterval(interval)
    }
    
    const series = [{
        data: data
    }]
    
    const options = {
        title: {
            text: `${queryParameters.get("id")}`.charAt(0).toUpperCase() + `${queryParameters.get("id")}`.slice(1) + " Price Chart",
            align: 'left'
          },
          stroke: {
            curve: 'smooth'
          },
        tooltip: {
            color: "#000000",
            foreColor: '#fff',
            enabled: true
        },
        dataLabels: {
            enabled: false
        },
        chart: {
            height: 380,
            width: "100%",
            background: "#29282e",
            foreColor: '#fff',
            animations: {
                initialAnimation: {
                enabled: true
                }
            },
            theme : {
                mode: 'dark',
            }
        },
        xaxis: {
            tooltip: {
                enabled: true
            },
            type: 'datetime',
        }
    }

    return (
        <div className="container">
            <ApexChart className="chart" options={options} series={series} height={500} width={1000} type="area" />
            <div className='buttonsGroup'>
                <div>
                    <button className="button" onClick={() => handlerOnClick('1')}>1d</button>
                </div>
                <div>
                    <button className="button" onClick={() => handlerOnClick('7')}>7d</button>
                </div>
                <div>
                    <button className="button" onClick={() => handlerOnClick('365')}>365d</button>
                </div>
            </div>

            
        </div>
    );     
};    

// const series = [{
//     data: data.prices.map(v => {
//         if (graphicType == "area") {
//             return [v[0], v[1].toFixed(2)]
//         } else {
//             return [v[0], v[1].toFixed(2)]                
//         }
//     }) 
// }]