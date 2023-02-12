import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slug from './pages/slug.js';
import Home from './pages/home.js';
import Sets from './pages/sets.js';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
 
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/slug' element={<Slug/>} />
        <Route path='/sets' element={<Sets/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
