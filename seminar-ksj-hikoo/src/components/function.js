import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

export const Navigateto = (url) => {
    const navi = useNavigate()
    navi(url)
}

export const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

export const typetotext = (type) => {
    if (type == 'waffle') {
      return '와플'
    } else if (type == 'beverage') {
      return '음료'
    } else if (type == 'coffee') {
      return '커피'
    }
  }

//   const [maxId, setMaxId] = useState(5);
//   const [enteredNum, setEnterdNum] = useState("");
//   const [enteredName, setEnterdName] = useState("");
//   const [enteredType, setEnterdType] = useState("");
//   const [enteredURL, setEnterdURL] = useState("");
//   const [enteredDes, setEnteredDes] = useState("");


//   const changeEnteredNum = (e) => {
//     const value = e.target.value.replaceAll(",", "");
//     if (!isNaN(value)) {
//       const removedCommaValue = Number(value);
//       setEnterdNum(removedCommaValue.toLocaleString());
//     } else {
//       alert("가격에는 숫자만 입력해야합니다.")
//       setEnterdNum("");
//     };
//   };

//   const changeEnteredName = (e) => {
//     const value = e.target.value;
//     setEnterdName(value);
//   }

//   const changeEnteredType = (e) => {
//     const value = e.target.value;
//     setEnterdType(value);
//   }

//   const changeEnteredURL = (e) => {
//     const value = e.target.value;
//     setEnterdURL(value);
//   }

//   const changeEnteredDes = (e) => {
//     const value = e.target.value;
//     setEnteredDes(value);
//   }

