import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/landing'
import Landing from './components/landing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import Profile from './components/profile'
import Principal from './components/principal'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  )
}

export default App
