import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//CSS
import "./css/Select.css";
import "./css/SakuraEffect.css"; // アニメーションCSSを読み込み

//画像
import sakuraImg from "/images/sakura.png";

//曲
import backSoundFile from "/sounds/カーソル移動2.mp3";
import selectSoundFile from "/sounds/刀の素振り1.mp3";

//キャラクター選択
const Select = ({ count = 30 }) => {
  const [petals, setPetals] = useState([]);
  const backAudioRef = useRef(null);
  const selectAudioRef = useRef(null);

  // 初期化（1度だけ）
  useEffect(() => {
    backAudioRef.current = new Audio(backSoundFile);
    backAudioRef.current.volume = 0.5;

    selectAudioRef.current = new Audio(selectSoundFile);
    selectAudioRef.current.volume = 0.5;
  }, []);

  //桜のエフェクト
  useEffect(() => {
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 80, // 出現Y位置（0〜80vh）
      delay: Math.random() * 5, // 秒
      duration: 6 + Math.random() * 5, // 秒
      size: 24 + Math.random() * 20, // px
    }));
    setPetals(newPetals);
  }, [count]);

  //選択キャラ
  const location = useLocation();
  const { name, image } = location.state || {};

  //ページ遷移
  const navigate = useNavigate();
  const handleClick1 = () => {
    //効果音
    if (backAudioRef.current) {
      backAudioRef.current.currentTime = 0;
      backAudioRef.current.play().catch(() => {});
    }

    navigate("/"); // 「/」ページへ遷移
  };
  const handleClick2 = () => {
    //効果音
    if (selectAudioRef.current) {
      selectAudioRef.current.currentTime = 0;
      selectAudioRef.current.play().catch(() => {});
    }

    // 効果音が聞こえるように少し遅延して遷移
    setTimeout(() => {
      navigate("/battle", { state: { selectNm: name } }); // 「/battle」ページへ遷移
    }, 200); // 音の長さに応じて調整（200〜300msくらいが目安）
  };

  return (
    <div className="app-container">
      {/* 桜吹雪のコンテナ */}
      <div className="sakura-container">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="sakura"
            style={{
              left: `-50px`,
              top: `${petal.top}vh`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              fontSize: `${petal.size}px`,
            }}
          >
            <img
              src={sakuraImg}
              alt="sakura"
              style={{
                width: "100%",
                height: "100%",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* メインコンテナ */}
      <div className="main-content">
        <img src={image} />
        <p className="p-text2">{name}を選択</p>
        <p className="p-text2">よろしいですか？</p>
        <div className="button-style">
          <button className="rounded-button" style={{ backgroundColor: "darkgray" }} onClick={handleClick1}>戻る</button>
          <button className="rounded-button" style={{ backgroundColor: "salmon" }} onClick={handleClick2}>いざ出陣！</button>
        </div>
      </div>
    </div>
  );
};

export default Select;
