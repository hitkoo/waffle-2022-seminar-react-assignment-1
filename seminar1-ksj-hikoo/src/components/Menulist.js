import '../css/Menulist.css';

function MenuBox({ menu_list, selectMenu, select, search, comma }) {

    // map과 filter 이용하여 메뉴 목록 표시
    // 조건문으로 search state값이 없으면 모든 메뉴, search state값이 있으면 그 값을 포함하는 이름을 가진 메뉴만 출력
    return (
        (search === null || search === '') ?
            menu_list.map((list) => (
                <div id={list.id} className={"Menu" + (list.id === selectMenu.id ? "select" : "")} onClick={() => { select(list) }}>
                    <span id='selectid' className='MenuID'>{list.id}</span>
                    <span className='MenuName'>{list.name}</span>
                    <span className='MenuPrice'>{comma(list.price)}</span>
                </div>
            )) : menu_list.filter((el) => el.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1).map((list) => (
                <div id={list.id} className={"Menu" + (list.id === selectMenu.id ? "select" : "")} onClick={() => { select(list) }}>
                    <span id='selectid' className='MenuID'>{list.id}</span>
                    <span className='MenuName'>{list.name}</span>
                    <span className='MenuPrice'>{comma(list.price)}</span>
                </div>
            ))
    );
}

export default MenuBox;