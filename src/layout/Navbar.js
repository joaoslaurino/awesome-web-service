import React, { useState, useEffect, useReducer } from "react";
import { Link } from 'react-router-dom'
import Container from './Container'
import "./Navbar.css"
import logo from "../img/kamas2.png";
import sun from "../img/sun.png";
import moon from "../img/moon.png";
// import "../List.css";
// import "../Coin.css";
import setMode from "../layout/Navbar.js"

// Componente Barra de Navegação que será utilizado em todas as páginas

function  Navbar () {

    // Aqui definimos a função que irá lidar com o modo dark e light

    function handleScreenMode() {
        var icon = document.getElementById("icon");
        document.body.classList.toggle("screenMode");
        if (document.body.classList.contains("screenMode")) {
            icon.src = moon;
        }
        else {
            icon.src = sun;
        }
        setMode(document.body.classList.contains("screenMode") ? "light" : "dark");
    }

    // Aqui definimos as páginas que a barra de navegação irá redirecionar

    return (
        <nav className="navbar">
            <Container>
            <a href="/"><img className="logo" src={logo} alt="kamas"/></a>
                <ul className="list">
                    <li className="item">
                        <Link className="textColor" to="/" >Home</Link>
                    </li>
                    <li className="item">
                        <Link className="textColor" to="about" >Sobre</Link>
                    </li>
                    <li>
                        <img src={sun} id="icon" className="darkMode" onClick={() => handleScreenMode()}/>
                    </li>
                </ul>
            </Container>
        </nav>
    )

}

export default Navbar