import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EditModePage } from '.';
import { convertForRedux, convertForServer } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';

function RenderEditPage({ match }) {
  console.log('RenderEditPage page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const getWidgetsDataFromServer = async () => {
    const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${user_seq}/edit`;
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
        setWidgetState(response.data);
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
    console.log(widget_data);
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

  function checkIsPageOwner() {
    // TODO: 접근권한 체크
    console.log('페이지 주인과 접근하려는 유저가 같은지 확인해야합니다.');
  }

  useEffect(() => {
    getWidgetsDataFromServer();
    checkIsPageOwner();
  }, []);

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  // access_token 만료의 경우
  if (data === 419) {
    window.location.assign(`${user_seq}/auth/token/refresh`);
    return <div> 토큰이 만료되었습니다. </div>;
  } else if (data === 401) {
    return <div> 로그인을 다시 하세요. </div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {/* <Link to='/save'>
        <button type='button'>save</button>
      </Link> */}
      <EditModePage />
    </div>
  );
}

export default RenderEditPage;
