import React from 'react';
import kakaoLogin from '../api/kakaoLogin';
import { ENDPOINT } from '../utils/constantValue';

// require('dotenv').config();

function KakaoCallback(props) {
  let code = '';

  async function getResult() {
    // 수정 필요(주소)
    const fetchedData = await fetch(`${ENDPOINT}/login/kakao`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization-Code': code,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        const ACCESS_TOKEN = result.data.access_token;
        const REFRESH_TOKEN = result.data.refresh_token;
        // 로컬에 저장함(약속된 사항)
        console.log('result:');
        console.log(result);
        console.log('callback ACCESS_TOKEN');
        console.log(ACCESS_TOKEN);
        console.log('callback REFRESH_TOKEN');
        console.log(REFRESH_TOKEN);
        localStorage.setItem('access_token', ACCESS_TOKEN);
        localStorage.setItem('refresh_token', REFRESH_TOKEN);
        window.location.assign('/');
        return result;
        // history.goBack();
      })
      .then((data) => data)
      .catch((error) => console.log('error'))
      .finally(() => {
        // history.goBack();
        window.location.assign('/');
      });
    console.log('fetchedData');
    console.log(fetchedData);
  }

  try {
    code = new URL(window.location.href).searchParams.get('code');
    getResult();
    // kakaoLogin(code);
  } catch (error) {
    console.log(error);
    window.location.assign('/');
  }

  return (
    <div>
      <p>Login redirect uri</p>
    </div>
  );
}

export default KakaoCallback;
