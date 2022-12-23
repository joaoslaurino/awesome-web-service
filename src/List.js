import React, {useState, useEffect} from "react";
import axios from "axios";
import "./List.css";
import Coin from "./Coin";
// import ApexChart from 'react-apexcharts';

export default function List() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => {
            setCoins(res.data)
        }).catch(error => console.log(error));
    }, []);

    const coinFilter = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(coinFilter)

    const handleChange = e => {
        setSearch(e.target.value);
    };

    return (
        <div className="binawesome">
            <div className="search">
                <form>
                    <input type="text" placeholder="Search" className="input" onChange={handleChange}/>
                </form>
            </div>
            {coinFilter.length === 0
            ? <div>No coins were found</div>
            : coinFilter.map(coin => {
                return (
                    <Coin 
                        key={coin.id}
                        id={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.market_cap}
                        price={coin.current_price}
                        onPriceChange={coin.price_change_percentage_24h}
                        marketcap={coin.total_volume}
                    />
                )
            })}
        </div>
        
    );
}