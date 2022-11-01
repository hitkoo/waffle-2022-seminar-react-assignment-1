import Store from './components/Store';
import Home from './components/Home';
import Login from './components/Login';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import DetailPage from './components/DetailPage';



export const IDContext = createContext();
export const MenuContext = createContext();

const initialMenu = [{
  "id": 1,
  "name": "초코와플",
  "price": 7000,
  "image": "",
  "type": "waffle",
  "description": "초코와플초코와플초코와플"
},
{
  "id": 2,
  "name": "아메리카노",
  "price": 4000,
  "image": "",
  "type": "coffee",
  "description": "아메리카노아메리카노아메리카노"
},
{
  "id": 3,
  "name": "블루베리스무디",
  "price": 6000,
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
  "type": "beverage",
  "description": "블루베리스무디블루베리스무디블루베리스무디"
},
{
  "id": 4,
  "name": "딸기와플",
  "price": 7000,
  "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
  "type": "waffle",
  "description": "딸기와플딸기와플딸기와플"
}]


function App() {

  const [LoginStatus, setLoginStatus] = useState({IsLogin:false, LoginID:"", LoginPW:""});
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
          <Route path='/store/:storeid' element={<Store />} />
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
