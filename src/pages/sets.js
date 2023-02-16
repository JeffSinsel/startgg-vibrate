import React, { useState,useEffect } from 'react';
import './pages.css';
import { useLocation } from 'react-router';
import { sendQuery,getSetsByPlayerId } from '../query.js';
import logo from '../logo.svg';
import addNotification from 'react-push-notification';
let j = 0;

const Sets = () => {
  j++
  const [sets, setSets] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [clock,setTime] = useState(Date.now);
  const location = useLocation();
  const playerId = location.state
  const timestamp = ~~(Date.now()/1000) - 86400
  let notifArray = [];
  let setDataArray = [];

  function fetchData(query,variables) {
    setState('loading');
    sendQuery(query,variables)
        .then((res) => {
            console.log(res.player.sets.nodes);
            setSets(res.player.sets.nodes);
            setState('success');
        })
        .catch((err) => {
            console.error('Error:', err);
            setState('error');
            setError(err);
        });
  }
  
  useEffect(() => {
    fetchData(getSetsByPlayerId,{'playerId': playerId,'timestamp': timestamp})
    j=0
    const interval = setInterval(() => setTime(Date.now()), 30000)
    return () => {
      clearInterval(interval);
    }
  },[playerId,timestamp])
  
  if (state === 'error')
  return (
      <h1>
          {error.toString()}
      </h1>
  );

  if (state === 'success') {
    let state = ""
    let station = '';
    let setArray = [];
    for (let i = 0; i<sets.length; i++) {
      sets[i].state === 1 ? state = " coming up. You'll receive a notification when it's time to check in" : sets[i].state === 2 ? state = " in progress. Good luck!" : sets[i].state === 3 ? state = " is completed." : sets[i].state === 4 ? state = " is ready to be started. You'll receive a notification when it's time to check in" : sets[i].state === 5 ? state = " is invalid." : sets[i].state === 6 ? state = " is called. Go check in if you haven't!" : sets[i].state === 7 ? state = " is queued. You'll receive a notification when it's time to check in" : state = "error"
      sets[i].station ? station ='. Your station number is ' + sets[i].station.number : station = 'Station blurb'
      setArray.push({"id":(sets[i].id),"eventName":(sets[i].event.name),"tournament":sets[i].event.tournament.name,"round":sets[i].fullRoundText,"startTime":localStorage.getItem("name"),"station":station,"state":state});
    }
    setDataArray = setArray.map((data) => <div key={data.id}><ul key={"name_"+data.id}>{data.eventName} at {data.tournament}, {data.round}:</ul><ul key={"state_"+data.id}><b>Your match{data.state}</b></ul><br /></div>);
  }

  if (state === "success" && j % 2 === 0) {
    if (sessionStorage.key(0) !== "name") {sessionStorage.setItem('name',JSON.stringify([]))}
    notifArray = JSON.parse(sessionStorage.getItem("name"));
    for (let i = 0; i<sets.length; i++) {
      if (sets[i].state === 6 && !notifArray.includes(sets[i].id)){
        addNotification({
          title: 'Time to Check-in!',
          subtitle: sets[i].event.name,
          message: sets[i].event.name+" at "+sets[i].event.tournament.name+", "+ sets[i].fullRoundText,
          theme: 'darkblue',
          native: true
        });
        notifArray.push(sets[i].id);
      } else if (sets[i].state !== 6 && notifArray.includes(sets[i].id)) {
          const index = notifArray.indexOf(sets[i].id);
          if (index > -1) {
            notifArray.splice(index, 1);
          }
    }} 
    sessionStorage.setItem("name",JSON.stringify(notifArray));
  }

  return (
    <div>
      <div>
        {state === 'success' ? (
          <div>
            <p>{playerId}</p>
            <p> Last Update: {new Date(clock).toLocaleTimeString("en-US",{timeStyle:"medium",timeZone:'America/New_York'})}</p>
            <img src={logo} alt="logo" />
            {setDataArray === [] ? (<h2>No active sets</h2>):(<h2>Sets:</h2>)}
            <ul key="list">{setDataArray}</ul>
          </div>
        ):(
          <h2>Loading...</h2>
        )}
      </div> 
    </div>
  );
};
  
export default Sets;