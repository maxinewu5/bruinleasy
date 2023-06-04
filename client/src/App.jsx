import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/Login' element = {<Login />} />
          <Route path = '/User' element = {<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
