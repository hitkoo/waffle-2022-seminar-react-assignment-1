import { useState } from 'react';
import '../css/MenuBox.css';
import MenuBox1 from './MenuBox1';
import MenuBox2 from './MenuBox2';
import Addmodal from './Addmodal.js';
import Updatemodal from './Updatemodal.js';
import React from 'react'
import Deletemodal from './Deletemodal';

function MenuBox({ search }) {

  // 여러 자식 컴포넌트에게 쓰이는 state를 전부 부모 컴포넌트에서 정의
  const [maxId, setMaxId] = useState(5);
  const [menu_list, setMenu] = useState([{
    "id": 1,
    "name": "초코와플",
    "price": 7000,
    "image": ""
  },
  {
    "id": 2,
    "name": "아메리카노",
    "price": 4000,
    "image": ""
  },
  {
    "id": 3,
    "name": "블루베리스무디",
    "price": 6000,
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg"
  },
  {
    "id": 4,
    "name": "딸기와플",
    "price": 7000,
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg"
  }]);
  const [enteredNum, setEnterdNum] = useState("");
  const [enteredName, setEnterdName] = useState("");
  const [enteredURL, setEnterdURL] = useState("");
 
  const [selectMenu, setSelect] = useState("");
  const select = (idx) => {
    setSelect(idx)
  }

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

  const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
  const showDeletemodal = () => {
    setDeletemodalOpen(true);
    setEnterdName(selectMenu.name)
    setEnterdNum(selectMenu.price)
    setEnterdURL(selectMenu.image)
  };


  // 가격을 입력할 때 세자리마다 , 붙여져서 출력되게 만드는 함수
  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  // slack에 물어봤던 질문이 이 부분을 작성하면서 넘겨줄 prop이 점점 많아져서 궁금해졌었습니다
  return (
    <div className="MenuBox">
      <MenuBox1
        menu_list={menu_list} showAddmodal={showAddmodal}
        selectMenu={selectMenu} select={select}
        search={search} comma={comma}>
      </MenuBox1>
      <MenuBox2
        selectMenu={selectMenu} setSelect={setSelect}
        showUpdatemodal={showUpdatemodal} showDeletemodal={showDeletemodal}
        comma={comma}>
      </MenuBox2>
      <Addmodal
        AddmodalOpen={AddmodalOpen} setAddmodalOpen={setAddmodalOpen}
        menu_list={menu_list} setMenu={setMenu} maxId={maxId}
        setMaxId={setMaxId} enteredNum={enteredNum}
        setEnterdNum={setEnterdNum} enteredName={enteredName}
        setEnterdName={setEnterdName} enteredURL={enteredURL}
        setEnterdURL={setEnterdURL} setSelect={setSelect}>
      </Addmodal>
      <Updatemodal
        UpdatemodalOpen={UpdatemodalOpen} setUpdatemodalOpen={setUpdatemodalOpen}
        menu_list={menu_list} setMenu={setMenu} maxId={maxId}
        setMaxId={setMaxId} enteredNum={enteredNum} setEnterdNum={setEnterdNum}
        enteredName={enteredName} setEnterdName={setEnterdName}
        enteredURL={enteredURL} setEnterdURL={setEnterdURL}
        selectMenu={selectMenu} setSelect={setSelect} comma={comma}>
      </Updatemodal>
      <Deletemodal
        DeletemodalOpen={DeletemodalOpen} setDeletemodalOpen={setDeletemodalOpen}
        menu_list={menu_list} setMenu={setMenu} maxId={maxId} setMaxId={setMaxId}
        enteredNum={enteredNum} setEnterdNum={setEnterdNum} enteredName={enteredName}
        setEnterdName={setEnterdName} enteredURL={enteredURL} setEnterdURL={setEnterdURL}
        selectMenu={selectMenu} setSelect={setSelect}>
      </Deletemodal>
    </div>

  );
}

export default MenuBox;