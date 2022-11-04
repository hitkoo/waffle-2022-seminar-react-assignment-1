import Store from './components/Store';
import Home from './components/Home';
import Login from './components/Login';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, json } from "react-router-dom";
import DetailPage from './components/DetailPage';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export const IDContext = createContext();
export const MenuContext = createContext();

function App() {

  const [LoginStatus, setLoginStatus] = useState({ IsLogin: false, LoginUser: "", UserID: "", Token: "" });
  const [StoreStatus, setStore] = useState({ id: "", name: "", owner: "" });
  const [menuList, setMenu] = useState();
  const [selectMenu, setSelect] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const LoginRefresh = JSON.parse(localStorage.getItem('login'))
    if (LoginRefresh != null) {
      axios
        .post("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/refresh", null, {
          withCredentials: true
        })
        .then((res) => {
          const token = res.data.access_token;
          setLoginStatus({ IsLogin: true, LoginUser: LoginRefresh.owner.username, UserID: LoginRefresh.owner.id, Token: token })
        })
        .catch((error) => {
          if (error.toJSON().status == 500) {
            window.location.reload()
          } else {
            localStorage.removeItem("login")
            setLoginStatus({ IsLogin: false, LoginUser: "", UserID: "", Token: "" })
          }
        });
    }
  }, [])

  return (
    <IDContext.Provider value={{ LoginStatus, setLoginStatus, StoreStatus, setStore }}>
      <MenuContext.Provider value={{ menuList, setMenu, selectMenu, setSelect, search, setSearch }}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
          theme="light" />
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/store/:owner' element={<Store />} />
            <Route path='/login' element={<Login />} />
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
