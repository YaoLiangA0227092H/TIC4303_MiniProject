import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './Login';
import SignUp from './Signup'
import Home from './Home';
import Create from './Create'
import Read from './Read'
import Update from './Update'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/read/:id' element={<Read />}></Route>
        <Route path='/edit/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
