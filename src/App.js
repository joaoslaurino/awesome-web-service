import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from "./List";
import Charts from "./Charts";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<List/>}/>
                    <Route path="charts" element={<Charts/>}/>
                </Routes>
            </BrowserRouter>
        </div>
        
    );
}