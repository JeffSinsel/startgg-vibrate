import React, { useState,useEffect } from 'react';
import './pages.css';
import { useLocation } from 'react-router';
import { sendQuery,getSetsByPlayerId } from '../query.js';
import logo from '../logo.svg';

const Sets = () => {
  const [sets, setSets] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [clock,setTime] = useState(Date.now);
  const location = useLocation();
  const playerId = location.state
  const timestamp = ~~(Date.now()/1000) - 1000000// 86400
  console.log(timestamp)
  function fetchData(query,variables) {
    setState('loading');
    sendQuery(query,variables)
        .then((res) => {
            console.log(res.player.sets.nodes);
            setState('success');
            setSets(res.player.sets.nodes);
        })
        .catch((err) => {
            console.error('Error:', err);
            setState('error');
            setError(err);
        });
  }
  
  useEffect(() => {
    fetchData(getSetsByPlayerId,{'playerId':playerId,'timestamp':timestamp})
    const interval = setInterval(() => setTime(Date.now()), 50000)
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
  let setDataArray = [];
  if (state === 'success') {
    let noun = '';
    let time = '';
    let station = '';
    let setArray = [];
    for (let i = 0; i<sets.length; i++) {
      sets[i].startAt !== 0 ? time = sets[i].startAt*1000 : time = sets[i].event.tournament.startAt*1000
      sets[i].startAt !== 0 ? noun = "match": noun = "tournament"
      sets[i].station ? station ='. Your station number is ' + sets[i].station.number : station = 'Station blurb'
      new Date(Date.now()).toLocaleTimeString("en-US",{timeStyle:"short",timeZone:'America/New_York'}) === new Date(time).toLocaleTimeString("en-US",{timeStyle:"short",timeZone:'America/New_York'}) ? navigator.vibrate(200) : console.log("who")
      setArray.push({"id":(sets[i].id),"eventName":(sets[i].event.name),"tournament":sets[i].event.tournament.name,"round":(sets[i].round > 0 ? "Winners Round " + sets[i].round : "Losers Round " + Math.abs(sets[i].round)),"startTime":(
      // if today
      Date.now() >= new Date(time).getTime()-60000? 
      // if today true (date time)
      `Your ${noun} has started. Good Luck!`
      // if today false if 5 minutes
      : Date.now() >= new Date(time).getTime()-300000 && Date.now() < new Date(time).getTime() ?
      // if today false if 5 minutes true (within 5 minutes "date time get to station")
      `Your ${noun} starts at ` + new Date(time).toLocaleTimeString("en-US",{timeStyle:"short",timeZone:'America/New_York'}) + String(station)
      // if today false if 5 minutes false if 0 minutes
      : Date.now() >= new Date(time).getTime()-86400000 && Date.now() < new Date(time).getTime()+300000 ? 
      // if today false if 5 minutes false if 0 minutes true (started "good luck")
      `Your ${noun} starts at ` + new Date(time).toLocaleTimeString("en-US",{timeStyle:"short",timeZone:'America/New_York'})  : `Your ${noun} is not today.`


      // // if today
      // new Date(sets[i].startAt*1000).getTime() !== 0 && Date.now() >= new Date(sets[i].startAt*1000).getTime()-84600000 ?
      //   // if today and match_time true if within 5 mins
      //   Date.now() <= new Date(sets[i].startAt*1000).getTime()-300000 ? 
      //   // 24hrs - 5min away and match_time true
      //   "Your  match starts at " + String(String(new Date(sets[i].startAt*1000).toLocaleDateString("en-US",{dateStyle:"short"}))+" "+String(new Date(sets[i].startAt*1000).toLocaleTimeString("en-US",{timeStyle:"short",timeZone: 'EST'})))
      //     // 5mins - 0mins away and match_time true
      //     : "Match has started, Good Luck!" 
      //   // if today false or match_time false
      //   : Date.now() < new Date(sets[i].event.tournament.startAt*1000) ? 
      //     // if 
      //     "Your tournament starts at "+ String(String(new Date(sets[i].event.tournament.startAt*1000).toLocaleTimeString("en-US",{timeStyle:"short",timeZone:'America/New_York'})))
      //     : Date.now() >= new Date(sets[i].startAt*1000).getTime() - 84600000 ? 
      //       "Tournament has started, Good Luck!" 
      //       : "Tournament is not today"
      )});} 
    setDataArray = setArray.map((data) => <div><p>{data.eventName} at {data.tournament}, {data.round}:</p><p><b>{data.startTime}</b></p><br /></div>);
  }
  return (
    <div>
      <div>
        {state === 'success' ? (
          <div>
            <p>{playerId}</p>
            <p> Last Update: {new Date(clock).toLocaleTimeString("en-US",{timeStyle:"medium",timeZone:'America/New_York'})}</p>
            <img src={logo} alt="logo" />
            <h2>Sets:</h2>
            <p>{setDataArray}</p>
          </div>
        ):(
          <h2>Loading...</h2>
        )}
      </div> 
    </div>
  );
};
  
export default Sets;