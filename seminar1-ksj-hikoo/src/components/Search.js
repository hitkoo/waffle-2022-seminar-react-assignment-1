import '../css/Search.css';
import React, { useRef } from 'react';

function Search({ search, setSearch }) {

  // onchange에 달려서 input값이 변할때마다 그 값으로 search state를 변경해주는 함수
  const SearchChange = (e) => {
    setSearch(e.target.value);
  }

  //이름 검색 클릭하면 input에 입력하는 상태가 되도록 하는 함수
  const SearchInput = useRef();
  function inputfocus() {
      SearchInput.current.focus()
  }

  return (
    <div className='Search'>
      <span onClick={()=>{inputfocus()}} className='Searchst'> 이름 검색:</span>
      <div className='Searchmerge'>
        <input type='text' value={search} id="SearchInput" placeholder="검색어 입력" ref={SearchInput} onChange={SearchChange}></input>
        <img className='Searchicon' src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt={'돋보기'} />
      </div>
    </div>
  );
}

export default Search;
