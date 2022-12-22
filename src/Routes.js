import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home'; // This is the component for the home page
import About from './About'; // This is the component for the about page

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;