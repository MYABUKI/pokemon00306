import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import homeMusic from "/sounds/220_BPM86.mp3";
import battleMusic from "/sounds/189_BPM150.mp3";
import resultMusic from "/sounds/229_BPM75.mp3";

const routeToMusic = {
  "/select": homeMusic,
  "/battle": battleMusic,
  "/result": resultMusic,
};

const MusicPlayer = () => {
  const location = useLocation();
  const audioRef = useRef(null); // 現在の Audio オブジェクト
  const currentMusicSrcRef = useRef(""); // 現在再生中の曲の src
  const volumeLevel = 0.1; // ここで音量を調整（0〜1）

  useEffect(() => {
    const music = routeToMusic[location.pathname];
    if (!music) return;

    // 以前の曲を停止
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    // 新しい曲を設定・再生
    const audio = new Audio(music);
    audio.loop = true;
    audio.volume = volumeLevel;
    audio.play().catch((e) => console.log("Auto-play failed:", e));
    audioRef.current = audio;

    // クリーンアップ
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [location.pathname]);

  return null; // UIに表示しない
};

export default MusicPlayer;
