import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import { sendQuery,getPlayerId } from '../query.js'

const Home= () => {
    const [input, setInput] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [state, setState] = useState('');
    const re = new RegExp('^[a-zA-Z0-9]+');
    const navigate = useNavigate();
    const toSets=(data)=>{
      navigate('/sets',{state:data});
        }
    
    function fetchData(query,variables) {
        if (input.length === 8 && re.test(input)) {
          setState('loading');
          sendQuery(query,variables)
              .then((res) => {
                  console.log(res);
                  setState('success');
                  setPlayerId(res.user.player.id);
              })
              .catch((err) => {
                  console.error('Error:', err);
                  setState('error');
                  setPlayerId('Invalid Slug or Error')
              });
        } else {
          setPlayerId('Invalid Slug');
        }
   }   

  
    const handleChange = event => {
      setInput(event.target.value);
    };
  
    const handleClick = event => {
      navigator.vibrate(200);
      event.preventDefault();
      if (input.length === 8 && re.test(input)) {
        fetchData(getPlayerId,{'slug':input})
      }
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Enter your start.gg slug to start</p>
          <form>
            <input id="slug-input" onChange={handleChange} />
            <button onClick={handleClick}>Submit</button>
            <p></p>
          </form>
          <Link to="/slug">What's a slug?</Link>
          <div>
              {state === 'loading' ? (
                  <h2>Loading...</h2>
              ): false}
              {state === 'success' ? ((playerId !== 'Invalid Slug or Error' || playerId !== 'Invalid Slug') ? toSets(playerId):false):false}
          </div>         
        </header>
      </div>
    );
}

export default Home;