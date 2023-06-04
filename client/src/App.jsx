import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/Login';
import CreateAccount from '../src/components/pages/AccountCreation'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/Login' element = {<Login />} />
          <Route path = '/CreateAccount' element = {<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;