import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NormalModePage } from '.';
import { convertForRedux } from '../utils/convert';
import {
  createReplacementUserAction,
  createReplacementWidgetsAction,
} from '../redux/slice';
import { getPageUser } from '../utils/parsing';

function RenderNormalPage({ match }) {
  const [userMatch, setUserMatch] = useState(false);
  const [pageUserName, setPageUserName] = useState('unkown');
  const { id } = match.params;
  console.log('RenderNormalPage page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = getPageUser();
  // console.log('==========id=========');
  // console.log(id);

  useEffect(() => {
    if (user_seq === page_user_seq) {
      setUserMatch(true);
    }
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const getUserDataFromServer = async () => {
    console.log('getUserData');
  };
  const getWidgetsDataFromServer = async () => {
    console.log('getWidgetsData');
    const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${page_user_seq}/normal`;
    try {
      setError(null);
      setData(null);
      setLoading(true);
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.code === 419) {
        setData(response.data.code);
      } else if (response.data.code === 401) {
        setData(response.data.code);
      } else {
        console.log('response data:', response.data);
        setWidgetState(response.data.widget_list);
        setPageUserName(response.data.user_name);
        console.log(`user name setting ${pageUserName}`);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // TODO: data 받아온 후 redux에 넣고, grid 그리기 위한 데이터로 사용하기
  const setWidgetState = async (widget_data) => {
    setData(widget_data);
    // console.log('==========data');
    // console.log(widget_data);
    const convertedForRedux = await convertForRedux(widget_data);
    // console.log(`convert for redux :`);
    // console.log(convertedForRedux);
    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  // setUserName(response.data.user_name);

  // const setUsername = async (name) => {
  //   dispatch(
  //     createReplacementUserAction({
  //       ...user,
  //       name: name,
  //     })
  //   );
  // };

  useEffect(() => {
    getWidgetsDataFromServer();
    getUserDataFromServer();
  }, []);

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  // access_token 만료의 경우
  if (data === 419) {
    window.location.assign(`/${user_seq}/auth/token/refresh`);
    return <div> 토큰이 만료되었습니다. </div>;
  } else if (data === 401) {
    return <div> 로그인을 다시 하세요. </div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      <NormalModePage
        userMatch={userMatch}
        pageUserId={id}
        pageUserName={pageUserName}
      />
    </div>
  );
}

export default RenderNormalPage;

// 리팩토링 시에 참고할 코드. 지우지 말아주세요.
// const dispatch = useDispatch();
// TODO: 로그인 안되었을때 데이터 처리(로그인, 데이터 받아오는 것 순서)
// useEffect(() => {
//   const setWidgetState = async () => {
//     const info = await getWidgetsInfo();
//     const convertedForRedux = await convertForRedux(info);
//     console.log(`convert for redux :`);
//     console.log(convertedForRedux);
//     dispatch(
//       createReplacementWidgetsAction({
//         count: info.length,
//         list: convertedForRedux,
//       })
//     );
//   };
//   setWidgetState();
// }, [dispatch]);
