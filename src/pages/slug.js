import React from 'react';
import './pages.css'
import { Link } from 'react-router-dom';
  
const Slug = () => {
  return (
    <div>
        <div class="images">
        <img src="slugexampleuser.png" alt="slug example user" />
        <img src="slugexamplelink.png" alt="slug example link" />
        </div>
        <h2>Slugs are the unique identifier given to you by Start.gg</h2>
        <h2>Slugs can be found in the link to your profile and on your profile</h2>
        <h2><Link to="/">Back to home</Link></h2>
    </div>
  );
};
  
export default Slug;