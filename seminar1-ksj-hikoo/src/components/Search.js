import '../css/Search.css';
import React, { useRef } from 'react';

function Search({ search, setSearch }) {

  // onchange에 달려서 input값이 변할때마다 그 값으로 search state를 변경해주는 함수
  const SearchChange = (e) => {
    setSearch(e.target.value);
  }


  return (
    <div className='Search'>
      <label htmlFor='SearchInput' className='Searchst'> 이름 검색 :</label>
      <div className='Searchmerge'>
        <input type='text' value={search} id="SearchInput" placeholder="검색어 입력" onChange={SearchChange}></input>
        <img className='Searchicon' src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt={'돋보기'} />
      </div>
    </div>
  );
}

export default Search;
