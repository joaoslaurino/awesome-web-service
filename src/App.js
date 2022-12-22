import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from "./List";
import Graphics from "./Graphics";

export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List/>}/>
                <Route path="graphics" element={<Graphics/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    
  );
}