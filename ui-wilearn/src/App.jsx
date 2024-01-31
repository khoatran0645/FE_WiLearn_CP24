import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import SignIn from './pages/Login/SignIn';
export default function App() {

  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    );
}

