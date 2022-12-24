import React, {useState, useEffect} from "react";
import axios from "axios";
import "./List.css";
import Coin from "./Coin";

// Aqui definimos a função que irá efetuar a primeira requisição para a API a qual será utilizada para montarmos a pagina inicial com todos os dados

export default function List() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => {
            setCoins(res.data)
        }).catch(error => console.log(error));
    },[]);

    // Aqui é definido o filtro que irá ser utilizado para filtrar os dados da API de acordo com o que o usuário digitar no campo de pesquisa

    const coinFilter = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleChange = e => {
        setSearch(e.target.value);
    };

    // Aqui iremos retornar o HTML da pagina, onde será montado o cabeçalho da tabela, o campo de pesquisa e o corpo da tabela com os dados da API

    return (
        <div className="container">
            <div className="coins">
                <div className="search">
                    <form>
                        <input type="text" placeholder="Search" className="input" onChange={handleChange}/>
                    </form>
                </div>
                <div className="mapping">
                    <div className="mapName"><h1>Name</h1></div>
                    <div className="mapSymbol"><h1>Symbol</h1></div>
                    <div className="mapPrice"><h1>Price</h1></div>
                    <div className="mapVolume"><h1>Volume</h1></div>
                    <div className="mapPriceChange"><h1>Price Change</h1></div>
                    <div className="mapMarketCap"><h1>Market Cap</h1></div>  
                </div>
                {coinFilter.length === 0
                ? <div>Nenhuma moeda encontrada</div>
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
                    );
                })}
            </div>
            <div className="space"/>
        </div>
    );
}