import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Login from './components/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Explore' element={<Explore />} />
          <Route path = '/Login' element = {<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
