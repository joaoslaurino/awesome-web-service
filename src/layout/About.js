import React from 'react'
import "./About.css";

// Componente que mostra a página Sobre

export default function About() {
    return (
        <div className="aboutContainer">
            <div className="notes">
                <h1 className="title">Sobre o Trabalho:</h1>
                <p className="text">Nosso trabalho é um aplicativo para checarmos os preços das criptomoedas atuais, tendo diversas informações sobre cada uma delas, incluindo preços, histórico e gráficos de preço. Fizemos a aplicação utilizando a API do CoinGecko, um site com a mesma funcionalidade que nosso aplicativo. A principal linguagem que utilizamos no código foi Javascript com React para fazer a ligação Front-Back do nosso código, e utilizamos o Axios para receber os dados da API. O trabalho foi feito em dupla por Arthur Zelindro e João Vitor Laurino.</p>
            </div>
        </div>
    )
}