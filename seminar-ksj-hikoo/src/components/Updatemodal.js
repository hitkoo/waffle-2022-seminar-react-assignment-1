import '../css/Updatemodal.css';
import '../css/Addmodal.css'
import React from "react";
import { useRef, useEffect } from 'react';
import { useState } from 'react'

function Updatemodal({ UpdatemodalOpen, setUpdatemodalOpen, setMenu, menuList, enteredNum, setEnterdNum, enteredName, setEnterdName, enteredURL, setEnterdURL, selectMenu, setSelect, comma }) {

  //AddModal과 동일
  const [animate, setAnimate] = useState(false);

  //AddModal과 동일
  const closeUpdatemodal = () => {
    
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setUpdatemodalOpen(false);
    }, 300);
  }

  //AddModal과 동일
  const changeEnteredNum = (e) => {
    const value = e.target.value;
    if (!isNaN(value.replaceAll(",", ""))) {
      const removedCommaValue = Number(value.replaceAll(",", ""));
      setEnterdNum(removedCommaValue.toLocaleString());
    } else {
      alert("가격에는 숫자만 입력해야합니다.")
      setEnterdNum("");
    };
  };

  //AddModal과 동일
  const changeEnteredName = (e) => {
    const value = e.target.value;
    setEnterdName(value);
  }

  //AddModal과 동일
  const changeEnteredURL = (e) => {
    const value = e.target.value;
    setEnterdURL(value);
  }

  //AddModal과 동일
  const UpdateMenu = () => {
    const name = enteredName
    const price = enteredNum
    const image = enteredURL
    const checkName = menuList.findIndex(e => e.name === enteredName)
    //AddModal과 동일하게 이름 중복을 체크하나, 이름은 변경하지 않았을 때 alert을 출력하지 않도록 logic을 수정
    if (name === '' || price === '') {
      alert("이름과 가격은 필수 입력 사항입니다.")
    }
    else if (checkName !== -1 && selectMenu.name !== enteredName) {
      alert("중복된 이름은 입력할 수 없습니다.")
      setEnterdName("");
    }
    else {
      const findIndex = menuList.findIndex(e => e.id === selectMenu.id)
      const newMenuList = [...menuList]
      if (findIndex !== -1) {
        newMenuList[findIndex] = { id: selectMenu.id, name: name, price: price, image: image }
      }
      setMenu(newMenuList);
      setSelect(newMenuList[findIndex])
      setEnterdName("");
      setEnterdNum("");
      setEnterdURL("");
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setUpdatemodalOpen(false);
      }, 300);
    }
  }

  //AddModal과 동일
  const UpdatemodalRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (UpdatemodalRef.current && !UpdatemodalRef.current.contains(e.target)) {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
          setUpdatemodalOpen(false);
        }, 300);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className={`background${animate ? "close" : ""}`}>
      <div ref={UpdatemodalRef} className={`container${animate ? "close" : ""}`}>
        <b className='title'>메뉴 수정</b>
        <p className='line'> <b className='subtitle'>이름</b>
          <input id='name' type='text' className='input' placeholder="맛있는와플(필수)" value={enteredName} onChange={changeEnteredName}></input></p>
        <p className='line'> <b className='subtitle'>가격</b>
          <input id='price' type='text' className='input' placeholder="10,000(필수)" value={comma(enteredNum)} onChange={changeEnteredNum}></input></p>
        <p className='line'> <b className='subtitle'>상품 이미지</b>
          <input id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeEnteredURL}></input></p>
        <div className='buttonArea'>
          <button className='update' onClick={() => UpdateMenu()}>
            수정
          </button>
          <button className='close' onClick={closeUpdatemodal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Updatemodal;