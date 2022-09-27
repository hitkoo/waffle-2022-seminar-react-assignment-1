import '../css/Deletemodal.css';
import React from "react";
import { useRef, useEffect } from 'react';
import { useState } from 'react'

function Deletemodal({ DeletemodalOpen, setDeletemodalOpen, setMenu, menuList, enteredNum, setEnterdNum, enteredName, setEnterdName, enteredURL, setEnterdURL, selectMenu, setSelect }) {

  //AddModal과 동일
  const [animate, setAnimate] = useState(false);

  //AddModal과 동일
  const closeDeletemodal = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setDeletemodalOpen(false);
    }, 300);
  }

  //삭제 버튼 클릭시 실행되는 함수
  const DeleteMenu = () => {
    const findIndex = menuList.findIndex(e => e.id === selectMenu.id)
    menuList.splice(findIndex, 1)
    const newMenuList = menuList
    setMenu(newMenuList)
    setSelect("")
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setDeletemodalOpen(false);
    }, 300);
  }

  //AddModal과 동일
  const DeletemodalRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (DeletemodalRef.current && !DeletemodalRef.current.contains(e.target)) {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
          setDeletemodalOpen(false);
        }, 300);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  if (!animate && !DeletemodalOpen) return null;
  return (
    <div className={!animate ? 'deletebackground' : 'deletebackgroundClose'}>
      <div ref={DeletemodalRef} className={!animate ? 'deleteContainer' : 'deleteContainerClose'}>
        <b className='deletetitle'>메뉴 삭제</b>
        <p className='deleteline'>정말로 삭제하시겠습니까?</p>
        <div className='deletebuttonArea'>
          <button className='delete' onClick={() => { DeleteMenu() }}>
            삭제
          </button>
          <button className='deleteclose' onClick={closeDeletemodal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deletemodal;
