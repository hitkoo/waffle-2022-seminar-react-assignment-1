import React from "react";
import './function.css';
import { Rating } from 'react-simple-star-rating'
import { IMenu } from "./Interface";

export const typetotext = (type: string|undefined) => {
  if (type === 'waffle') {
    return '와플'
  } else if (type === 'beverage') {
    return '음료'
  } else if (type === 'coffee') {
    return '커피'
  } else if (type === 'dessert') {
    return '디저트'
  } else
    return null
}

export const FindMenubyID = (menulist: IMenu[], id: number) => {
  const Index = menulist.findIndex(e => e.id === Number(id))
  return Index
}

export const FindMenubyName = (menulist: IMenu[], name: string) => {
  const Index = menulist.findIndex(e => e.name === name)
  return Index
}
export const timeForToday = (value: string) => {
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

export const rateToStar = (rate: number) => {
  const rating = Math.floor(rate) / 2
  return (
    <div className="RateToStar">
    <Rating 
      readonly={true}
      initialValue = {rating}
      size = {15}
      allowFraction={true}
    />
    </div>)
}

export const rateToStarBig = (rate: number) => {
  const rating = Math.floor(rate) / 2
  return (
    <div className="RateToStarBig">
    <Rating 
      readonly={true}
      initialValue = {rating}
      size = {25}
      allowFraction={true}
    />
    </div>)
}