import { useContext, useState } from 'react';
import { EveryContext } from '../App';
import '../css/MenuBox.css';
import MenuBox1 from './MenuBox1';
import MenuBox2 from './MenuBox2';
import Addmodal from './Addmodal.js';
import Updatemodal from './Updatemodal.js';
import React from 'react'
import Deletemodal from './Deletemodal';

function MenuBox() {


  const value = useContext(EveryContext);
  
  const search = value.search
  const maxId = value.maxId
  const setMaxId = value.setMaxId
  const menuList = value.menuList
  const setMenu = value.setMenu
  const enteredNum = value.enteredNum
  const setEnterdNum = value.setEnterdNum
  const enteredName = value.enteredName
  const setEnterdName = value.setEnterdName
  const enteredURL = value.enteredURL
  const setEnterdURL = value.setEnterdURL
  const selectMenu = value.selectMenu
  const setSelect = value.setSelect
  const select = value.select
  const comma = value.comma

  const [AddmodalOpen, setAddmodalOpen] = useState(false);
  const showAddmodal = () => {
    setAddmodalOpen(true);
    setEnterdName("");
    setEnterdNum("");
    setEnterdURL("");
  };

  const [UpdatemodalOpen, setUpdatemodalOpen] = useState(false);
  const showUpdatemodal = () => {
    setUpdatemodalOpen(true);
    setEnterdName(selectMenu.name)
    setEnterdNum(selectMenu.price)
    setEnterdURL(selectMenu.image)
  };

  return (
    <div className="MenuBox">
      <MenuBox1 showAddmodal={showAddmodal}>
      </MenuBox1>
      <MenuBox2 showUpdatemodal={showUpdatemodal} >
      </MenuBox2>
      {AddmodalOpen && <Addmodal
        AddmodalOpen={AddmodalOpen} setAddmodalOpen={setAddmodalOpen}
        menuList={menuList} setMenu={setMenu} maxId={maxId}
        setMaxId={setMaxId} enteredNum={enteredNum}
        setEnterdNum={setEnterdNum} enteredName={enteredName}
        setEnterdName={setEnterdName} enteredURL={enteredURL}
        setEnterdURL={setEnterdURL} setSelect={setSelect}>
      </Addmodal>}
      {UpdatemodalOpen && <Updatemodal
        UpdatemodalOpen={UpdatemodalOpen} setUpdatemodalOpen={setUpdatemodalOpen}
        menuList={menuList} setMenu={setMenu} maxId={maxId}
        setMaxId={setMaxId} enteredNum={enteredNum} setEnterdNum={setEnterdNum}
        enteredName={enteredName} setEnterdName={setEnterdName}
        enteredURL={enteredURL} setEnterdURL={setEnterdURL}
        selectMenu={selectMenu} setSelect={setSelect} comma={comma}>
      </Updatemodal>}
    </div>

  );
}

export default MenuBox;