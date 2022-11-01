import Store from './components/Store';
import Home from './components/Home';
import Login from './components/Login';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import DetailPage from './components/DetailPage';
import axios from 'axios';



export const IDContext = createContext();
export const MenuContext = createContext();

const initialMenu = []


function App() {

  const [LoginStatus, setLoginStatus] = useState({IsLogin:false, LoginUser:"", UserID:"", Token:""});
  const [StoreId, setStoreId] = useState("");
  const [maxId, setMaxId] = useState(5);
  const [menuList, setMenu] = useState(initialMenu);
  const [selectMenu, setSelect] = useState("");
  const [search, setSearch] = useState("");

  return (
    <IDContext.Provider value={{LoginStatus, setLoginStatus, StoreId, setStoreId}}>
    <MenuContext.Provider value={{maxId, setMaxId, menuList, setMenu, selectMenu, setSelect, search, setSearch}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/store/:owner' element={<Store />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/menus/:id' element={<DetailPage />} />
          <Route path='/menus/new' element={<AddPage />}></Route>
          <Route path='/menus/:id/edit' element={<EditPage />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </MenuContext.Provider>
    </IDContext.Provider>
  );
}

export default App;
