import '../css/Deletemodal.css';
import React from "react";
import { useRef, useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Deletemodal({ DeletemodalOpen, setDeletemodalOpen, params, StoreStatus, MenuOrReview }) {

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
    axios
      .delete(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
        },
        params: { id: params.id }
      })
      .then(() => {
        axios
          .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: StoreStatus.id } })
          .then((res) => {
            toast.success('메뉴 삭제 성공했습니다');
            setAnimate(true);
            setTimeout(() => {
              setAnimate(false);
              setDeletemodalOpen(false);
              navigate(`/store/${StoreStatus.id}`);
            }, 300);
          })
          .catch((error) => {
            console.log(error)
            toast.error('메뉴 삭제 실패했습니다');
          })
      })
      .catch((error) => {
        toast.error('메뉴 삭제 실패했습니다');
      })
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
    <div className={`deletebackground${animate ? "Close" : ""}`} >
      <div ref={DeletemodalRef} className={`deleteContainer${animate ? "Close" : ""}`}>
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
