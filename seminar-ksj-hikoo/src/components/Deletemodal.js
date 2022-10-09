import '../css/Deletemodal.css';
import React from "react";
import { useRef, useEffect, useContext } from 'react';
import { EveryContext } from '../App';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Deletemodal({ DeletemodalOpen, setDeletemodalOpen }) {

  const value = useContext(EveryContext)

  const menuList = value.menuList
  const selectMenu = value.selectMenu
  const setMenu = value.setMenu
  const setSelect = value.setSelect

  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);

  const closeDeletemodal = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setDeletemodalOpen(false);
    }, 300);
  }

  const DeleteMenu = () => {
    const findIndex = menuList.findIndex(e => e.id === selectMenu.id)
    menuList.splice(findIndex, 1)
    const newMenuList = menuList
    setMenu(newMenuList)
    setSelect("")
    navigate("/store/1")
    setAnimate(false)
    setDeletemodalOpen(false);
  }

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
    <div className={`deletebackground${animate?"Close":""}`} >
      <div ref={DeletemodalRef} className={`deleteContainer${animate?"Close":""}`}>
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
