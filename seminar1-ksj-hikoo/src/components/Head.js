import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';




function Head() {

  return (
    <div className="Head">
      <a href="https://wafflestudio.com"><img className="Logo" src={logo} alt="Logo" /></a>
      <a href="https://wafflestudio.com" className='headtitle'><h1>와플스튜디오 메뉴 관리</h1></a>
    </div>
  );
}

export default Head;