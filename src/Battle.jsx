import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//CSS
import "./css/Battle.css";

//画像
import ImgHBkasyu from "/images/kasyukiyomitsu4.png";
import ImgHBmanba from "/images/yamanbagirikunihiro4.png";
import ImgHBmutsu from "/images/mutsunokamiyoshiyuki4.png";
import ImgHBkasen from "/images/kasenkanesada4.png";
import ImgHBhatisuka from "/images/hatisukakotetsu4.png";
import ImgHBsokougun from "/images/sokougun.png";

//戦闘
const Battle = () => {
  //選択キャラを判定
  const location = useLocation();
  const { selectNm } = location.state || {};

  let imageSrc;
  if (selectNm === "加州清光") {
    imageSrc = ImgHBkasyu;
  } else if (selectNm === "山姥切国広") {
    imageSrc = ImgHBmanba;
  } else if (selectNm === "陸奥守吉行") {
    imageSrc = ImgHBmutsu;
  } else if (selectNm === "歌仙兼定") {
    imageSrc = ImgHBkasen;
  } else if (selectNm === "蜂須賀虎徹") {
    imageSrc = ImgHBhatisuka;
  } else {
    imageSrc = ImgHBkasyu; // デフォルト画像
  }

  //アニメーション
  const [step, setStep] = useState(-1); // -1 = 戦闘開始表示
  const [showStartText, setShowStartText] = useState(true);
  const [leftHp, setLeftHp] = useState(10);
  const [rightHp, setRightHp] = useState(10);
  const [leftDamage, setLeftDamage] = useState(null);
  const [rightDamage, setRightDamage] = useState(null);
  const [showLeftHitEffect, setShowLeftHitEffect] = useState(false);
  const [showRightHitEffect, setShowRightHitEffect] = useState(false);
  const [effectType, setEffectType] = useState(null); // 'left' または 'right'
  const navigate = useNavigate();

  //効果音
  const playAttackSound = (type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  };

  // 最初に「戦闘開始」表示 → スタート
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartText(false);
      setStep(0);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // アニメーション＆攻撃処理
  useEffect(() => {
    if (step >= 4 || step < 0) return;

    const isLeftAttack = step % 2 === 0;

    // ① 中央に到達するタイミングでエフェクト表示
    const effectTimer = setTimeout(() => {
      if (isLeftAttack) {
        setEffectType("left"); // 左攻撃用のエフェクト
        setShowRightHitEffect(true); // 表示するのは右キャラの上
        playAttackSound("attack1"); // ← 左の攻撃音を再生
      } else {
        setEffectType("right"); // 右攻撃用のエフェクト
        setShowLeftHitEffect(true); // 表示するのは左キャラの上
        playAttackSound("attack2"); // ← 右の攻撃音を再生
      }

      // エフェクト非表示
      setTimeout(() => {
        setShowRightHitEffect(false);
        setShowLeftHitEffect(false);
        setEffectType(null);
      }, 400);
    }, 1500); // 攻撃開始から1.5秒で中央到達したと仮定

    // ② ダメージ処理
    const damageTimer = setTimeout(() => {
      const damage = Math.floor(Math.random() * 5) + 1;

      if (isLeftAttack) {
        setRightHp((prev) => Math.max(prev - damage, 0));
        setRightDamage(damage);
      } else {
        setLeftHp((prev) => Math.max(prev - damage, 0));
        setLeftDamage(damage);
      }

      // 数値表示を消す
      setTimeout(() => {
        setLeftDamage(null);
        setRightDamage(null);
      }, 800);

      setStep((prev) => prev + 1);
    }, 3000); // 攻撃アニメーション全体が終わるタイミング

    return () => {
      clearTimeout(effectTimer);
      clearTimeout(damageTimer);
    };
  }, [step]);

  // 戦闘終了後 → 自動遷移
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        const winner =
          leftHp > rightHp ? "left" : rightHp > leftHp ? "right" : "draw";
        navigate("/result", {
          state: {
            leftHp,
            rightHp,
            winner,
            selectNm,
          },
        });
      }, 3000); // 「戦闘終了」表示後に遷移
      return () => clearTimeout(timer);
    }
  }, [step, leftHp, rightHp, selectNm, navigate]);

  return (
    <div className="Battle-page">
      {/* 戦闘開始表示 */}
      {showStartText && (
        <div className="start-text">
          <div className="start-box">戦　闘　開　始</div>
        </div>
      )}

      {/* HP表示エリア */}
      <div className="hp-bar">
        <div className="hp-container">
          <span className="player-label">{selectNm}</span>
          <div className="hp-gauge">
            <div
              className="hp-fill"
              style={{
                width: `${(leftHp / 10) * 100}%`,
                backgroundColor: leftHp <= 3 ? "#f44336" : "#4caf50",
              }}
            />
          </div>
          <span className="hp-value">{leftHp} / 10</span>
        </div>

        <div className="hp-container">
          <span className="player-label">時間遡行軍</span>
          <div className="hp-gauge">
            <div
              className="hp-fill"
              style={{
                width: `${(rightHp / 10) * 100}%`,
                backgroundColor: rightHp <= 3 ? "#f44336" : "#4caf50",
              }}
            />
          </div>
          <span className="hp-value">{rightHp} / 10</span>
        </div>
      </div>

      {/* 刀剣男士画像 */}
      <div
        className={`character left ${step % 2 === 0 && step < 4 ? "animate-left" : ""}`}
      >
        <img src={imageSrc} alt="toukendanshi" />
        {showLeftHitEffect && (
          <div
            className={`hit-effect ${effectType === "right" ? "right-hit" : ""}`}
          />
        )}
        {leftDamage && <div className="damage-text">-{leftDamage}</div>}
      </div>

      {/* 遡行軍画像 */}
      <div
        className={`character right ${step % 2 === 1 && step < 4 ? "animate-right" : ""}`}
      >
        <img src={ImgHBsokougun} alt="sokougun" />
        {showRightHitEffect && (
          <div
            className={`hit-effect ${effectType === "left" ? "left-hit" : ""}`}
          />
        )}
        {rightDamage && <div className="damage-text">-{rightDamage}</div>}
      </div>

      {/* 戦闘終了の表示 */}
      {step === 4 && (
        <div className="end-text">
          <div className="end-box">戦　闘　終　了</div>
        </div>
      )}
    </div>
  );
};

export default Battle;
