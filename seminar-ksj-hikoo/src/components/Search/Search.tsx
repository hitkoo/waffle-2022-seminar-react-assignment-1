import './Search.scss';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { MenuContext } from '../../App'
import { useLocation, useParams } from 'react-router-dom'

function Search() {
  const value = useContext(MenuContext)
  const param = useParams();
  const setSearch = value.setSearch
  const location = useLocation();
  const [input, setinput] = useState<string>("");
  const [throttle, setThrottle] = useState<boolean>(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [param.owner, setSearch])

  return (
    <div className='Search'>
      <label htmlFor='SearchInput'>{location.pathname === '/' ? '가게' : '메뉴 이름'} 검색 :</label>
      <div className='Searchmerge'>
        <input type='text' value={input} id="SearchInput" placeholder="검색어 입력" onChange={inputChange}></input>
        <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt={'돋보기'} />
      </div>
    </div>
  );
}

export default Search;
