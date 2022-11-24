import './MenuBox.scss';
import MenuBox1 from './MenuBox1';
import MenuBox2 from './MenuBox2';
import React from 'react'

function MenuBox() {
 
  return (
    <div className="MenuBox">
      <MenuBox1/>
      <MenuBox2/>
    </div>

  );
}

export default MenuBox;