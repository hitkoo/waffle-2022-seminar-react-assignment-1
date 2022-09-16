import '../css/Addmodal.css';
import React from "react";
import { useRef, useEffect, useState } from 'react';

function Addmodal({ AddmodalOpen, setAddmodalOpen, setMenu, menu_list, maxId, setMaxId, enteredNum, setEnterdNum, enteredName, setEnterdName, enteredURL, setEnterdURL, setSelect }) {

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
  // #이 부분에서 input이 비어있을 때는 의도대로 작동하는데 이미 숫자가 입력된 상태에서 문자를 입력하면 NaN을 출력해버립니다. 도저히 해결방법을 모르겠습니다ㅠㅠ
  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const numCheck = /^[0-9,]/.test(value);
    if (!numCheck && value) {
      alert("가격에는 숫자만 입력해야합니다.")
      setEnterdNum("");
    };
    if (numCheck) {
      const removedCommaValue = Number(value.replaceAll(",", ""));
      setEnterdNum(removedCommaValue.toLocaleString());
    }
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
    const checkName = menu_list.findIndex(e => e.name === enteredName)
    //메뉴 이름 중복을 확인하는 logic
    if (name === '' || price === '') {
      alert("이름과 가격은 필수 입력 사항입니다.")
    }
    else if (checkName !== -1) {
      alert("중복된 이름은 입력할 수 없습니다.")
      setEnterdName("");
    }
    else {
      const new_menu_list = [...menu_list, { id: maxId, name: name, price: price, image: image }]
      setMenu(new_menu_list);
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
  if (!animate && !AddmodalOpen) return null;
  return (
    <div className={!animate ? "background" : "backgroundClose"}>
      <div ref={AddmodalRef} className={!animate ? 'container' : 'cotainerClose'}>
        <b className='title'>메뉴 추가</b>
        <p className='line'> <b className='subtitle'>이름</b>
          <input id='name' type='text' className='input' placeholder="맛있는와플(필수)" value={enteredName} onChange={changeEnteredName}></input></p>
        <p className='line'> <b className='subtitle'>가격</b>
          <input id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeEnteredNum}></input></p>
        <p className='line'> <b className='subtitle'>상품 이미지</b>
          <input id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeEnteredURL}></input></p>
        <div className='buttonArea'>
          <button className='add' onClick={() => { addMenu() }}>
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
