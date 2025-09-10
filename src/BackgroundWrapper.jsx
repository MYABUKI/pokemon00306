import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//画像
import ImgHaikei from '/images/haikei.jpg';

function BackgroundWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // ページごとに背景色を切り替え
    if (location.pathname === '/') {
      document.body.style.backgroundColor = 'black';

    } else if (location.pathname === '/select') {
      document.body.style.background = 'radial-gradient(circle, #ffffff 0%, #fffbe6 50%, #fff3b0 100%)';

    } else if (location.pathname === '/battle') {
      document.body.style.backgroundImage = `url(${ImgHaikei})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';

    } else if (location.pathname === '/result') {
      document.body.style.background = 'radial-gradient(circle, #ffffff 0%, #fffbe6 50%, #fff3b0 100%)';

    } else {
      document.body.style.backgroundColor = ''; // デフォルトに戻す
      document.body.style.background = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }

    // クリーンアップ（アンマウント時に戻す）
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.background = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, [location]);

  return <>{children}</>;
}

export default BackgroundWrapper;