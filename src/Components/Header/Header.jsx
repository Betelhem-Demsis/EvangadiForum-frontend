import React from 'react'
import img1 from '../../assets/10001.png'
import './Header.css'

function Header() {
  return (
    <section className='header'>
      <div className='outer-div'>
        <div className='inner-div'>
          <a href="/"> <img src={img1} alt="logo" /></a>
        </div>
        <div className='anchor-tags'>
          <a href="home">Home</a>
          <a href="#">How it Works</a>
          <button className='Sign-in-button'>SIGN IN</button>
        </div>
      </div>
    </section>
  );
}

export default Header;
