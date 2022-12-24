import React from "react";
import "./Coin.css";

// Aqui definimos as funções que lidam com o mouse hover

function handleMouseOver(e) {
    e.currentTarget.classList.add("mouseHover");
} 

function handleMouseOut(e) {
    e.currentTarget.classList.remove("mouseHover");
}

// Aqui efetuamos o mapeamento dos dados recebidos da API 

const Coin = ({ id, name, image, symbol, price, volume, onPriceChange, marketcap }) => {
    return (
        <div className="unity" onMouseOver={e => handleMouseOver(e)} onMouseOut={e => handleMouseOut(e)}>
            <div className="row">
                <a href={`/charts?id=${id}`} target="_self">
                    <div className="coin">
                        <img src={image} alt="crypto" />
                        <h1 className="name">{name}</h1>
                        <p className="symbol">{symbol}</p>
                    </div>
                </a>
                <div className="data">
                    <p className="price">${price}</p>
                    <p className="volume">${volume.toLocaleString()}</p>
                    {onPriceChange < 0
                        ? <p className="percent red">{onPriceChange.toFixed(2)}%</p>
                        : <p className="percent green">{onPriceChange.toFixed(2)}%</p>
                    }
                    <p className="marketcap">${marketcap.toLocaleString()}</p>
                </div>
            </div>
        </div>
        
    );
};

export default Coin;