import React from 'react';
import { useSelector } from 'react-redux';
// import getAccessToken from '../api/getAccessToken';
import { ENDPOINT, REFRESH_TOKEN } from '../utils/constantValue';
import RenderLoginPage from './RenderLoginPage';

// 여기
function Main(props) {
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  console.log(widget);
  async function renewAccessToken() {
    const fetchedData = await fetch(`${ENDPOINT}/token/refresh`, {
      method: 'GET',
      headers: {
        refresh_token: `Bearer ${REFRESH_TOKEN}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        console.log('result:');
        console.log(result);
        const ACCESS_TOKEN = result.data.access_token;
        console.log('ACCESS_TOKEN renew:');
        console.log(ACCESS_TOKEN);
        // 로컬에 저장함(약속된 사항)
        localStorage.setItem('access_token', ACCESS_TOKEN);
        window.location.assign('/');
        return result;
        // history.goBack();
      })
      .then((data) => data)
      .catch((error) => console.log('error'));
    console.log(JSON.stringify(fetchedData));
  }
  return (
    <div>
      <button type='button' onClick={() => window.location.assign('/normal')}>
        my homepage
      </button>
      {/* <button type='button' onClick={() => window.location.assign('/login')}>
        login
      </button> */}
      <RenderLoginPage />
      <button type='button' onClick={renewAccessToken}>
        토큰 재발급
      </button>
    </div>
  );
}

export default Main;
// <button type='button' onClick={getAccessToken}>
