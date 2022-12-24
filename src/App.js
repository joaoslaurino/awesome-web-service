import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from "./List";
import Charts from "./Charts";
import About from "./layout/About";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Componente geral da aplicação onde definimos tanto a estrutura como as rotas

export default function App() {
    return (
        <div>
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<List/>}/>
                    <Route path="charts" element={<Charts/>}/>
                    <Route path="about" element={<About/>}/>
                </Routes>
            <Footer/>
            </BrowserRouter>
        </div>
    );
}