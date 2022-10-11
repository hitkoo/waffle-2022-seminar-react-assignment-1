import Store from './components/Store';
import Home from './components/Home';
import Login from './components/Login';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DetailPage from './components/DetailPage';

export const EveryContext = createContext();
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


  const [LoginId, setLoginId] = useState("");
  const [maxId, setMaxId] = useState(5);
  const [menuList, setMenu] = useState(initialMenu);
  const [enteredNum, setEnterdNum] = useState("");
  const [enteredName, setEnterdName] = useState("");
  const [enteredType, setEnterdType] = useState("");
  const [enteredURL, setEnterdURL] = useState("");
  const [enteredDes, setEnteredDes] = useState("");
  const [selectMenu, setSelect] = useState("");
  const [search, setSearch] = useState("");

  const select = (idx) => {
    setSelect(idx)
  }

  const changeEnteredNum = (e) => {
    const value = e.target.value.replaceAll(",", "");
    if (!isNaN(value)) {
      const removedCommaValue = Number(value);
      setEnterdNum(removedCommaValue.toLocaleString());
    } else {
      alert("가격에는 숫자만 입력해야합니다.")
      setEnterdNum("");
    };
  };

  const changeEnteredName = (e) => {
    const value = e.target.value;
    setEnterdName(value);
  }

  const changeEnteredType = (e) => {
    const value = e.target.value;
    setEnterdType(value);
  }

  const changeEnteredURL = (e) => {
    const value = e.target.value;
    setEnterdURL(value);
  }

  const changeEnteredDes = (e) => {
    const value = e.target.value;
    setEnteredDes(value);
  }

  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
  const showDeletemodal = () => {
    setDeletemodalOpen(true);
  };

  const typetotext = (type) => {
    if (type == 'waffle') {
      return '와플'
    } else if (type == 'beverage') {
      return '음료'
    } else if (type == 'coffee') {
      return '커피'
    }
  }

  return (
    <EveryContext.Provider value={{LoginId, setLoginId,
      maxId, setMaxId, menuList, setMenu, enteredNum, changeEnteredNum, setEnterdNum,
      enteredName, changeEnteredName, setEnterdName, enteredURL, changeEnteredURL, setEnterdURL,
      enteredDes, changeEnteredDes, setEnteredDes, enteredType, changeEnteredType, setEnterdType,
      selectMenu, setSelect, select, search, setSearch, DeletemodalOpen, setDeletemodalOpen, showDeletemodal,
      comma, typetotext,
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/store/:storeid' element={<Store />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menus/:id' element={<DetailPage />} />
          <Route path='/menus/new' element={<AddPage />}></Route>
          <Route path='/menus/edit/:id' element={<EditPage />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </EveryContext.Provider>
  );
}

export default App;
