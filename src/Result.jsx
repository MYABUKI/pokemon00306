import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//CSS
import "./css/Result.css";

//曲
import backSoundFile from "/sounds/カーソル移動2.mp3";

//結果
const Result = () => {
  const location = useLocation();
  const { leftHp, rightHp, winner, selectNm } = location.state || {};
  const backAudioRef = useRef(null);

  // 初期化（1度だけ）
  useEffect(() => {
    backAudioRef.current = new Audio(backSoundFile);
    backAudioRef.current.volume = 0.5;
  }, []);

  const navigate = useNavigate();
  const handleClick1 = () => {
    //効果音
    if (backAudioRef.current) {
      backAudioRef.current.currentTime = 0;
      backAudioRef.current.play().catch(() => {});
    }

    navigate("/"); // 「/」ページへ遷移
  };

  return (
    <div className="Result-page">
      {/* 🌸 勝利時だけ桜を表示 */}
      {winner === "left" && <div className="sakura-effect" />}

      <div className="main-container">
        <h1 className="h-text">戦　闘　結　果</h1>
         <br></br>
        <p>
          {selectNm}の生存: {leftHp}
        </p>
        <p>時間遡行軍の生存: {rightHp}</p>
        <br></br>
        <h1
          className={`${
            winner === "draw"
              ? "draw-text"
              : winner === "left"
                ? "win-text"
                : "lose-text"
          }`}
        >
          {winner === "draw"
            ? "引き分け"
            : winner === "left"
              ? selectNm + "の勝利！"
              : selectNm + "の敗北..."}
        </h1>
        <br></br>
        <button
          className="rounded-button"
          style={{ backgroundColor: "darkgray" }}
          onClick={handleClick1}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default Result;
