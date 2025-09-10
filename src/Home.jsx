import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//CSS
import "./css/Home.css";

//画像
import ImgSkasyu from "/images/kasyukiyomitsu.png";
import ImgSmanba from "/images/yamanbagirikunihiro.png";
import ImgSmutsu from "/images/mutsunokamiyoshiyuki.png";
import ImgSkasen from "/images/kasenkanesada.png";
import ImgShatisuka from "/images/hatisukakotetsu.png";
import ImgHkasyu from "/images/kasyukiyomitsu2.png";
import ImgHmanba from "/images/yamanbagirikunihiro2.png";
import ImgHmutsu from "/images/mutsunokamiyoshiyuki2.png";
import ImgHkasen from "/images/kasenkanesada2.png";
import ImgHhatisuka from "/images/hatisukakotetsu2.png";
import ImgHZkasyu from "/images/kasyukiyomitsu3.png";
import ImgHZmanba from "/images/yamanbagirikunihiro3.png";
import ImgHZmutsu from "/images/mutsunokamiyoshiyuki3.png";
import ImgHZkasen from "/images/kasenkanesada3.png";
import ImgHZhatisuka from "/images/hatisukakotetsu3.png";

//曲
import hoverSoundFile from "/sounds/カーソル移動2.mp3";
import selectSoundFile from "/sounds/刀を鞘にしまう1.mp3";

//刀選択
const Home = () => {
  const hoverAudioRef = useRef(null);
  const selectAudioRef = useRef(null);
  const navigate = useNavigate();

  // 初期化（1度だけ）
  useEffect(() => {
    hoverAudioRef.current = new Audio(hoverSoundFile);
    hoverAudioRef.current.volume = 0.5;

    selectAudioRef.current = new Audio(selectSoundFile);
    selectAudioRef.current.volume = 0.5;
  }, []);

  // hoverで再生
  const playHoverSound = () => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(() => {});
    }
  };

  //クリックで再生
  const handleClick = (state) => {
    if (selectAudioRef.current) {
      selectAudioRef.current.currentTime = 0;
      selectAudioRef.current.play().catch(() => {});
    }

    // 効果音が聞こえるように少し遅延して遷移
    setTimeout(() => {
      navigate("/select", { state });
    }, 200); // 音の長さに応じて調整（200〜300msくらいが目安）
  };

  return (
    <div className="home-page">
      <div className="main-container">
        <p className="p-text">好きな刀を選択してください</p>
        <div className="image-container">
          <div className="image-wrapper" onMouseEnter={playHoverSound}>
            <div onClick={() => handleClick({ name: "加州清光", image: ImgHZkasyu })}>
              <img src={ImgSkasyu} className="default-image" />
              <img src={ImgHkasyu} className="hover-image" />
            </div>
          </div>
          <div className="image-wrapper" onMouseEnter={playHoverSound}>
            <div onClick={() => handleClick({ name: "山姥切国広", image: ImgHZmanba })}>
              <img src={ImgSmanba} className="default-image" />
              <img src={ImgHmanba} className="hover-image" />
            </div>
          </div>
          <div className="image-wrapper" onMouseEnter={playHoverSound}>
            <div onClick={() => handleClick({ name: "陸奥守吉行", image: ImgHZmutsu })}>
              <img src={ImgSmutsu} className="default-image" />
              <img src={ImgHmutsu} className="hover-image" />
            </div>
          </div>
          <div className="image-wrapper" onMouseEnter={playHoverSound}>
            <div onClick={() => handleClick({ name: "歌仙兼定", image: ImgHZkasen })}>
              <img src={ImgSkasen} className="default-image" />
              <img src={ImgHkasen} className="hover-image" />
            </div>
          </div>
          <div className="image-wrapper" onMouseEnter={playHoverSound}>
            <div onClick={() => handleClick({ name: "蜂須賀虎徹", image: ImgHZhatisuka })}>
              <img src={ImgShatisuka} className="default-image" />
              <img src={ImgHhatisuka} className="hover-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
