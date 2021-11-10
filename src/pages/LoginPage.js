import React from 'react';
import { useSelector } from 'react-redux';
import RenderLoginPage from './RenderLoginPage';

function LoginPage() {
  const { widget } = useSelector((state) => ({
    widget: state.info.widget,
  }));
  console.log(widget);

  return (
    <div>
      <RenderLoginPage />
    </div>
  );
}

export default LoginPage;
