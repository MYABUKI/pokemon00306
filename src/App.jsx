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

function App() {
  return (
    <div className="App">

      <div class="image-container">
        <div class="image-wrapper">
          <img src={ImgSkasyu} class="default-image" />
          <img src={ImgHkasyu} class="hover-image" />
          <div class="text-overlay">加州清光</div>
        </div>
        <div class="image-wrapper">
          <img src={ImgSmanba} class="default-image" />
          <img src={ImgHmanba} class="hover-image" />
          <div class="text-overlay">山姥切国広</div>
        </div>
        <div class="image-wrapper">
          <img src={ImgSmutsu} class="default-image" />
          <img src={ImgHmutsu} class="hover-image" />
          <div class="text-overlay">陸奥守吉行</div>
        </div>
        <div class="image-wrapper">
          <img src={ImgSkasen} class="default-image" />
          <img src={ImgHkasen} class="hover-image" />
          <div class="text-overlay">歌仙兼定</div>
        </div>
        <div class="image-wrapper">
          <img src={ImgShatisuka} class="default-image" />
          <img src={ImgHhatisuka} class="hover-image" />
          <div class="text-overlay">蜂須賀虎徹</div>
        </div>
      </div>
    </div>
  );
}
export default App;