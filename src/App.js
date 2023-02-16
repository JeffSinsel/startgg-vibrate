import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slug from './pages/slug.js';
import Home from './pages/home.js';
import Sets from './pages/sets.js';
import React from 'react';

function App() {
  return (
    <BrowserRouter basename='startgg-vibrate'>
    <Routes>
        <Route exact path='/' element={<Home/>} key="Home" />
        <Route path='/slug' element={<Slug/>} key="Slug" />
        <Route path='/sets' element={<Sets/>} key="Sets" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
