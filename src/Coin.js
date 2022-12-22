import { findByLabelText } from "@testing-library/react";
import React from "react";
import "./Coin.css";
import Graphics from "./Graphics";
// import { useHistory } from "react-router-dom";

function handleMouseOver(e) {
    e.currentTarget.classList.add("mouseHover");
    // document.getElementById(this.id).classList.add("hover");
} 

function handleMouseOut(e) {
    e.currentTarget.classList.remove("mouseHover");
}

const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap }) => {
    return (
        <div className="container" onMouseOver={e => handleMouseOver(e)} onMouseOut={e => handleMouseOut(e)}>
            <div className="row">
                <a href={`/graphics?name=${name}`} target="_blank">
                    <div className="coin">
                        <img src={image} alt="crypto" />
                        <h1>{name}</h1>
                        <p className="symbol">{symbol}</p>
                    </div>
                </a>
                <div className="data">
                    <p className="price">${price}</p>
                    <p className="volume">${volume.toLocaleString()}</p>
                    {priceChange < 0
                        ? <p className="percent red">{priceChange.toFixed(2)}%</p>
                        : <p className="percent green">{priceChange.toFixed(2)}%</p>
                    }
                    <p className="marketcap">${marketcap.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

// const attempt = {
//     backgroundColor: "#393740",
// }

export default Coin;