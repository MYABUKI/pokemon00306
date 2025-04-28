import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

import ImgSkasyu from "./assets/kasyukiyomitsu.png";
import ImgSmanba from "./assets/yamanbagirikunihiro.png";
import ImgSmutsu from "./assets/mutsunokamiyoshiyuki.png";
import ImgSkasen from "./assets/kasenkanesada.png";
import ImgShatisuka from "./assets/hatisukakotetsu.png";
import ImgHkasyu from "./assets/kasyukiyomitsu2.png";
import ImgHmanba from "./assets/yamanbagirikunihiro2.png";
import ImgHmutsu from "./assets/mutsunokamiyoshiyuki2.png";
import ImgHkasen from "./assets/kasenkanesada2.png";
import ImgHhatisuka from "./assets/hatisukakotetsu2.png"
import "./App.css";

//選択
const Home = () => {
  return (
    <div className="App">
      <div class="image-container">
        <div class="image-wrapper">
        <Link to="/select" state={{ name: '加州清光' }}>
          <img src={ImgSkasyu} class="default-image"/>
          <img src={ImgHkasyu} class="hover-image"/>
        </Link>
        </div>
        <div class="image-wrapper">
        <Link to="/select" state={{ name: '山姥切国広' }}>
          <img src={ImgSmanba} class="default-image" />
          <img src={ImgHmanba} class="hover-image"/>
          </Link>
        </div>
        <div class="image-wrapper">
        <Link to="/select" state={{ name: '陸奥守吉行' }}>
          <img src={ImgSmutsu} class="default-image" />
          <img src={ImgHmutsu} class="hover-image"/>
          </Link>
        </div>
        <div class="image-wrapper">
        <Link to="/select" state={{ name: '歌仙兼定' }}>
          <img src={ImgSkasen} class="default-image" />
          <img src={ImgHkasen} class="hover-image" />
          </Link>
        </div>
        <div class="image-wrapper">
        <Link to="/select" state={{ name: '蜂須賀虎徹' }}>
          <img src={ImgShatisuka} class="default-image" />
          <img src={ImgHhatisuka} class="hover-image" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Select = () => {
  const location = useLocation();
  const { name } = location.state || {};

  return (
    <div className="App">
      <p>{name}を選択</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
      </Routes>
    </Router>
  );
}

export default App;