import '../css/MenuBox1.css';
import Menulist from './Menulist.js';


function MenuBox({menu_list,showAddmodal, selectMenu, select, search, comma}) {
  
  //menu_list state를 활용해서 메뉴 목록을 띄워주는 부분은 하위 컴포넌트로 넘김
  return (
      <div className='MenuBox_1'>
        <div className='MenuListBox'>
          <div className='MenuContent'>
            <div className='ID'><b>ID</b></div>
            <div className='Name'><b>이름</b></div>
            <div className='Price'><b>가격</b></div>
          </div>
          <Menulist menu_list={menu_list} selectMenu={selectMenu} select={select} search={search} comma={comma} ></Menulist>
          <button id='AddButton' onClick={showAddmodal}>+</button>
        </div>
      </div>
  );
}

export default MenuBox;