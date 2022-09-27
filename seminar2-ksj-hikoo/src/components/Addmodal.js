import '../css/Addmodal.css';
import React from "react";
import { useRef, useEffect, useState } from 'react';

function Addmodal({ AddmodalOpen, setAddmodalOpen, setMenu, menuList, maxId, setMaxId, enteredNum, setEnterdNum, enteredName, setEnterdName, enteredURL, setEnterdURL, setSelect }) {

  // 모달이 닫힐 때 애니메이션이 보여지게 하기 위한 state
  const [animate, setAnimate] = useState(false);

  // 모달이 닫힐 때 애니메이션을 보여지게 하기 위해 setTimeout과 animate state활용
  const closeAddmodal = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setAddmodalOpen(false);
    }, 300);
  }

  // 가격을 입력하면 enteredNum state를 가격 input값으로 변경 
  // 조건문을 통해 숫자외의 값을 입력하면 alert을 띄움 

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

  // 이름을 입력하면 enteredName state를 이름 input값으로 변경
  const changeEnteredName = (e) => {
    const value = e.target.value;
    setEnterdName(value);
  }

  // img url을 입력하면 enteredURL state를 img input값으로 변경
  const changeEnteredURL = (e) => {
    const value = e.target.value;
    setEnterdURL(value);
  }

  // 추가버튼 클릭시 실행되는 함수
  const addMenu = () => {
    const name = enteredName
    const price = enteredNum
    const image = enteredURL
    const checkName = menuList.findIndex(e => e.name === enteredName)
    //메뉴 이름 중복을 확인하는 logic
    if (name === '' || price === '') {
      alert("이름과 가격은 필수 입력 사항입니다.")
    }
    else if (checkName !== -1) {
      alert("중복된 이름은 입력할 수 없습니다.")
      setEnterdName("");
    }
    else if (enteredNum.replaceAll(",", "")%10 !== 0){
      alert("가격의 최소단위는 10원입니다.")
    }
    else {
      const newMenuList = [...menuList, { id: maxId, name: name, price: price, image: image }]
      setMenu(newMenuList);
      setSelect({ id: maxId, name: name, price: price, image: image })
      setMaxId(maxId + 1);
      setEnterdName("");
      setEnterdNum("");
      setEnterdURL("");
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setAddmodalOpen(false);
      }, 300);
    }
  }

  // 모달창 외부 클릭시 닫히게 하도록 하는 함수
  const AddmodalRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (AddmodalRef.current && !AddmodalRef.current.contains(e.target)) {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
          setAddmodalOpen(false);
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
      <div ref={AddmodalRef} className={`container${animate ? "close" : ""}`}>
        <b className='title'>메뉴 추가</b>
        <p className='line'> <b className='subtitle'>이름</b>
          <input id='name' type='text' className='input' placeholder="맛있는와플(필수)" value={enteredName} onChange={changeEnteredName}></input></p>
        <p className='line'> <b className='subtitle'>가격</b>
          <input id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeEnteredNum}></input></p>
        <p className='line'> <b className='subtitle'>상품 이미지</b>
          <input id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeEnteredURL}></input></p>
        <div className='buttonArea'>
          <button className='add' onClick={() => addMenu()}>
            추가
          </button>
          <button className='close' onClick={closeAddmodal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addmodal;
