import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/Login/SignIn';
import Home from './pages/Landing/Home';
import Register from './pages/Register/Register';


export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);
}