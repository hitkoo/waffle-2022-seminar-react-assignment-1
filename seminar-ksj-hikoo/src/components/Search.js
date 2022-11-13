import '../css/Search.css';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { MenuContext } from '../App'
import { useLocation, useParams } from 'react-router-dom'

function Search() {
  const value = useContext(MenuContext)
  const param = useParams();
  const setSearch = value.setSearch
  const location = useLocation();
  const [input, setinput] = useState("");
  const [throttle, setThrottle] = useState(false);

  const inputChange = (e) => {
    setinput(e.target.value);
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        setSearch(e.target.value)
        setThrottle(false)
      }, 500)
    }
  }

  useEffect(() => {
    setinput("")
    setSearch("")
  }, [param.owner])

  return (
    <div className='Search'>
      <label htmlFor='SearchInput' className='Searchst'>{location.pathname === '/' ? '가게' : '메뉴 이름'} 검색 :</label>
      <div className='Searchmerge'>
        <input type='text' value={input} id="SearchInput" placeholder="검색어 입력" onChange={inputChange}></input>
        <img className='Searchicon' src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt={'돋보기'} />
      </div>
    </div>
  );
}

export default Search;
