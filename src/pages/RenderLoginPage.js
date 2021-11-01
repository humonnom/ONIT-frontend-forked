import React from 'react';

function RenderLoginPage() {
  const signInWithKakao = () => {
    const endPoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endPoint);
  };

  return (
    <div>
      <button type='button' style={buttonImgStyle} onClick={signInWithKakao}>
        <img
          src='//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg'
          width='250'
          alt=''
        />
      </button>
    </div>
  );
}

const buttonImgStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  backgroundColor: 'white',
};

export default RenderLoginPage;
