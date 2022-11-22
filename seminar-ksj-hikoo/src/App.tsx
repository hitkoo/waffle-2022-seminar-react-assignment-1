import Store from './components/MenuPage/Store';
import Home from './components/Home/Home';
import Login from './components/LoginPage/Login';
import AddPage from './components/Addpage/AddPage';
import EditPage from './components/EditPage/EditPage';
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DetailPage from './components/DetailPage/DetailPage';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { IIDContext, IMenuContext, ILoginStatus, initLoginStatus, IStoreStatus, initStoreStatus, IMenu, ILoginRefresh } from './lib/Interface';

export const IDContext = createContext<IIDContext>({} as IIDContext);
export const MenuContext = createContext<IMenuContext>({} as IMenuContext);

function App() {

  const [loginStatus, setLoginStatus] = useState<ILoginStatus>(initLoginStatus());
  const [storeStatus, setStore] = useState<IStoreStatus>(initStoreStatus());
  const [menuList, setMenu] = useState<IMenu[]>({} as IMenu[]);
  const [selectMenu, setSelect] = useState<IMenu>({} as IMenu);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const LoginRefresh:ILoginRefresh|null = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')||"{}") : null
    if (LoginRefresh != null) {
      axios
        .post("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/refresh", null, {
          withCredentials: true
        })
        .then((res) => {
          const token: string = res.data.access_token;
          setLoginStatus({ IsLogin: true, LoginUser: LoginRefresh.username, UserID: LoginRefresh.id, Token: token })
        })
        .catch((error) => {
          localStorage.removeItem("login")
          setLoginStatus(initLoginStatus())
        });
    }
  }
    , [selectMenu])

  return (
    <IDContext.Provider value={{ LoginStatus: loginStatus, setLoginStatus, StoreStatus: storeStatus, setStore }}>
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
            <Route path='/' element={<Home />} />
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
