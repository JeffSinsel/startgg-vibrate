import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import Slug from './slug.js';

const Home= () => {
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Enter your start.gg slug to start</p>
          <Link to="/slug">What's a slug?</Link>
          <form>
            <input id="slug-input" onChange={handleChange} value = {message}></input>
            <button onClick={Slug}>Update</button>
            <h2>{message}</h2>
          </form>
        </header>
      </div>
    );
}
  
  
export default Home;