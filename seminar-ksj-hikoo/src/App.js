import Store from './components/Store';
import Home from './components/Home';
import Login from './components/Login';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DetailPage from './components/DetailPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/store' element={<Store/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/detail' element={<DetailPage/>}/>
        <Route path="*" element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
