import React from 'react';
import { useSelector } from 'react-redux';
import Signin from '../components/Signin';
import getAccessToken from '../api/getAccessToken';
import RenderLoginPage from './RenderLoginPage';

function Main(props) {
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  console.log(widget);

  return (
    <div>
      {/* <button type='button' onClick={() => window.location.assign('/normal')}>
        my homepage
      </button> */}
      {/* <Signin /> */}

      <button type='button' onClick={() => window.location.assign('/save')}>
        save
      </button>
      <RenderLoginPage />
    </div>
  );
}

export default Main;
