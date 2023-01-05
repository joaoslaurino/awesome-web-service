import ApexChart from 'react-apexcharts';
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Charts.css";
import "./layout/Navbar.css";

// Componente que renderiza os gráficos de acordo com o intervalo de tempo escolhido pelo usuário

export default function Graphics() {

    // definindo as constantes que serão utilizadas

    const [coins, setCoins] = useState([]);
    const [interval, setInterval] = useState('365');
    const [data, setData] = useState([]);
    const [queryParameters] = useSearchParams();
    const [graphicType, setGraphicType] = useState('area');
    const [mode, setMode] = useState('dark');

    // Função que define o tipo de gráfico que será renderizado

    useEffect(() => {
        let id = queryParameters.get("id")
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${interval}`)
        .then(res => {
            setData(res.data.prices.map(v => {
                return [v[0], v[1].toFixed(2)+"$"]
            }))
        }).catch(error => console.log(error));

    }, [interval]);
    
    // Variável utilizada para alternar entre o light e o darkmode

    const chooseMode = document.body.classList.contains("screenMode") ? "light" : "dark";
    const backgroundMode = document.body.classList.contains("screenMode") ? "#f8f8f8" : "#29282e";

    // Efeito utilizado para efetuar a requisição novamente quando o tema for alterado

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => {
            setCoins(res.data)
        }).catch(error => console.log(error));
    }, [mode]);
    
    // Filtrando o array de moedas para retornar apenas a moeda que o usuário está visualizando

    const currentCoin = coins.filter(coin => coin.id === queryParameters.get("id"));

    // Aqui são definidas as funções para lidar com os hovers dos componentes

    function handlerOnClick(interval) {
        setInterval(interval)
    }

    function handleMouseOver(e) {
        e.currentTarget.classList.add("mouseHover");
    } 

    function handleMouseOut(e) {
        e.currentTarget.classList.remove("mouseHover");
    }

    // Aqui são definidas as opções do gráfico e os dados que serão utilizados para a renderização

    const series = [{
        data: data
    }]
    
    const options = {
        title: {
            text: [currentCoin.map(coin => coin.name)] + " (" + [currentCoin.map(coin => coin.symbol.toUpperCase())] + ")" + " Price Chart",
            align: 'left'
        },
        stroke: {
            curve: 'smooth'
        },
        theme: {
            mode: mode,
        },
        // tooltip: {
        //     enabled: true,
        //     theme: true,
            
        // },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            fillSeriesColor: false,
            theme: false,
            style: {
              fontSize: '12px',
              fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: true,
                format: 'dd MMM',
                formatter: undefined,
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName) => "Preço:",
                },
            },
            z: {
                formatter: undefined,
                title: 'Size: '
            },
            marker: {
                show: true,
            },
            fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        chart: {
            background: backgroundMode,
            fontFamily: 'Neutro, Arial, sans-serif',
            animations: {
                initialAnimation: {
                enabled: true
                }
            },
        },
        xaxis: {
            tooltip: {
                enabled: true,
                type: 'price',
            },
            type: 'datetime',
        },
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize: '14px',
            fontFamily: 'Neutro, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },
    }

    // Aqui é definido o formato do preço da moeda
    
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // A partir daqui é definido as informações adicionais em relação à moeda que o usuário está visualizando

    const array = [1, 7, 14, 30, 90, 365]
    
    return (
        <div className="coinInfo">
            <div className="chartGroup">
                <div className="buttonsGroup">
                    {array.map((item, index) => {
                        return (
                            <button key={index} className="chartButtons" onMouseOver={e => handleMouseOver(e)} onMouseOut={e => handleMouseOut(e)} onClick={() => handlerOnClick(item)}>{item}d</button>
                        )}
                    )}
                </div>
                
            </div>
            <div className="info">
                <ApexChart className="chart" options={options} series={series} type={graphicType} height={400} width={950} />
                <div className="infoGroup">
                    <div className="infoTittle">
                        <img className="image" src={currentCoin.map(coin => coin.image)}/>
                        <h1 >{currentCoin.map(coin => coin.symbol.toUpperCase())} Estatísticas de Preços</h1>
                    </div>
                    <div className="infoItem">
                        <p className="infoName">Preço do {currentCoin.map(coin => coin.name)}: </p>
                        <p className="infoValue">US$ {USDollar.format(currentCoin.map(coin => coin.current_price))}</p>
                    </div>

                    <div className="infoItem">
                        <p className="infoName">Baixa de 24h / Alta de 24h: </p>
                        <p className="infoValue">US$ {USDollar.format(currentCoin.map(coin => coin.high_24h))} / US$ {USDollar.format(currentCoin.map(coin => coin.low_24h))}</p>
                    </div>

                    <div className="infoItem">
                        <p className="infoName">Ranking de Mercado: </p>
                        <p className="infoValue">#{currentCoin.map(coin => coin.market_cap_rank)}</p>
                    </div>

                    <div className="infoItem">
                        <p className="infoName">Volume Total: </p>
                        <p className="infoValue">US$ {USDollar.format(currentCoin.map(coin => coin.total_volume))}</p>
                    </div>

                    <div className="infoItem">
                        <p className="infoName">Capitalização de Mercado: </p>
                        <p className="infoValue">US$ {USDollar.format(currentCoin.map(coin => coin.market_cap))}</p>
                    </div>
                    
                    <div className="infoItem">
                        <p className="infoName">Alta de Todos os Tempos: </p>
                        <p className="infoRed">US$ {USDollar.format(currentCoin.map(coin => coin.ath))}</p>
                    </div>

                    <div className="infoItem">
                        <p className="infoName">Baixa de Todos os Tempos: </p>
                        <p className="infoGreen">US$ {USDollar.format(currentCoin.map(coin => coin.atl))}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};    
