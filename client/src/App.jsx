import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';

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
          <Route path = '/Search' element = {<SearchBar />} />
          <Route path = '/User' element = {<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
