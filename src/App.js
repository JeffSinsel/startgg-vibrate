import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slug from './pages/slug.js';
import Home from './pages/home.js';

function App() {

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handleClick = event => {
    event.preventDefault();

    // 👇️ value of input field
    console.log('handleClick 👉️', message);
  };

  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/slug' element={<Slug/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
