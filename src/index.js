import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Componente principal de renderização

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App/>)