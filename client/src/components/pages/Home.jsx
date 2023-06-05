import React from 'react';
import '../../App.css';
import FrontPage from '../FrontPage';

function Home({user}) {
  return (
    <>
      <FrontPage user={user}/>
    </>
  );
}

export default Home;