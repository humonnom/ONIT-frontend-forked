import React from 'react';

function RenderLoginPage() {
  const signInWithKakao = () => {
    const endPoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endPoint);
  };

  return (
    <div>
      <button type='button' onClick={signInWithKakao}>
        카카오 로그인
      </button>
    </div>
  );
}

export default RenderLoginPage;
