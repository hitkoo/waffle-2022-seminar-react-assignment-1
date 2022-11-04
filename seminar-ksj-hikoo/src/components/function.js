import React from "react";
import '../css/function.css';
import { Rating } from 'react-simple-star-rating'

export const typetotext = (type) => {
  if (type === 'waffle') {
    return '와플'
  } else if (type === 'beverage') {
    return '음료'
  } else if (type === 'coffee') {
    return '커피'
  }
}

export const FindMenubyID = (menulist, id) => {
  const Index = menulist.findIndex(e => e.id === Number(id))
  return Index
}

export const FindMenubyName = (menulist, name) => {
  const Index = menulist.findIndex(e => e.name === name)
  return Index
}

export const FilterMenu = (menulist, search) => {
  const filteredMenu = menulist.filter((el) => el.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1)
  return filteredMenu
}

export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const rateToStar = (rate) => {
  const rating = Math.floor(rate) / 2
  return (
    <div className="RateToStar">
    <Rating 
      readonly={true}
      initialValue = {rating}
      size='15'
      allowFraction={true}
    />
    </div>)
}

export const rateToStarBig = (rate) => {
  const rating = Math.floor(rate) / 2
  return (
    <div className="RateToStarBig">
    <Rating 
      readonly={true}
      initialValue = {rating}
      size='25'
      allowFraction={true}
    />
    </div>)
}


// axios
// .patch("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/me", {
//   "store_name": "롤드컵와플",
//   "store_description": "롤드컵에 절여져서 생각이 이거밖에 안나네요"
// }, {
//   withCredentials: true,
//   headers: {
//     Authorization: `Bearer ${LoginStatus.Token}`
//   }
// })
// .then(() => {
//   console.log('가게명 변경완료')
// })
// .catch(() => {
//   console.log('가게명 변경실패')
// })