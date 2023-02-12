import React from 'react';
import './pages.css';
import { useLocation } from 'react-router';
  
const Sets = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Sets</h1>
      <h1>{location.state}</h1>
    </div>
  );
};
  
export default Sets;