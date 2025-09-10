import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Select from "./Select";
import Battle from "./Battle";
import Result from "./Result";
import BackgroundWrapper from "./BackgroundWrapper";
import MusicPlayer from "./MusicPlayer";

const MUSIC_PLAY_PERMISSION_KEY = "hasMusicPermission";

const App = () => {
  return (
    <Router>
      <MusicPlayer />
      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
};

export default App;
