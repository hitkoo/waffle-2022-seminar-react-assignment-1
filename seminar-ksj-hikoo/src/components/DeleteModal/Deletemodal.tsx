import './Deletemodal.scss';
import React from "react";
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ILoginStatus, IStoreStatus } from '../../lib/Interface';
import { IOwner } from '../../lib/Interface';

interface Dprops {
  setDeletemodalOpen: React.Dispatch<React.SetStateAction<boolean>>
  StoreStatus?: IStoreStatus
  LoginStatus: ILoginStatus
  MenuOrReview?: string
  ReviewId?: number
  getReviews?: () => void
}

function DeleteLogic({ setDeletemodalOpen, StoreStatus, LoginStatus, getReviews }: Dprops) {
  const params = useParams();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const LoginRefresh: IOwner | null = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login') || "{}") : null

  const DeleteMenu = () => {
    axios
      .delete(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${LoginStatus.Token}`
        },
        params: { id: params.id }
      })
      .then(() => {
        axios
          .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: StoreStatus?.id } })
          .then((res) => {
            toast.success('메뉴 삭제 성공했습니다');
            setAnimate(true);
            setTimeout(() => {
              setAnimate(false);
              setDeletemodalOpen(false);
              navigate(`/store/${StoreStatus?.id}`);
            }, 300);
          })
          .catch((error) => {
            toast.error('메뉴 삭제 실패했습니다');
          })
      })
  }

  const DeleteReview = (id: number | undefined) => {
    if (LoginRefresh) {
      axios
        .delete(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${LoginStatus.Token}`
          },
          params: { id: id }
        })
        .then(() => {
          if(getReviews){
          getReviews()}
        })
        .catch((error) => {
          toast.error('리뷰 삭제 실패');

        })
    } else {
      toast.warn('로그인 후 이용해주세요');
      navigate('/login')
    }
  }


  const closeDeletemodal = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setDeletemodalOpen(false);
    }, 300);
  }

  return { animate, DeleteMenu, DeleteReview, closeDeletemodal }
}



export default function Deletemodal({ setDeletemodalOpen, StoreStatus, LoginStatus, MenuOrReview, ReviewId, getReviews }: Dprops) {

  const { animate, DeleteMenu, DeleteReview, closeDeletemodal } = DeleteLogic({ setDeletemodalOpen, StoreStatus, LoginStatus, getReviews })

  return (
    <div className={`deletebackground${animate ? "Close" : ""}`} onClick={closeDeletemodal} >
      <div className={`deleteContainer${animate ? "Close" : ""}`}>
        <b className='deletetitle'>{MenuOrReview === 'Menu' ? '메뉴' : '리뷰'} 삭제</b>
        <p className='deleteline'>정말로 삭제하시겠습니까?</p>
        <div className='deletebuttonArea'>
          <button className='delete' onClick={() => { MenuOrReview === 'Menu' && ReviewId === undefined ? DeleteMenu() : DeleteReview(ReviewId) }}>
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
