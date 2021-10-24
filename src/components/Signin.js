import React from 'react';
import RenderLoginPage from '../pages/RenderLoginPage';

function Signin() {
  const background = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#301e4e',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  };

  const style = {
    width: '400px',
    height: '400px',
    border: '2px solid rgba(100, 186, 255,1)',
    position: 'flex',
    display: 'inline-block',
    verticalAlignt: 'middle',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '15px 15px 42px 0px rgb(190,190,190)',
  };

  const mainStyle = {
    position: 'flex',
    display: 'inline-block',
    // backgroundColor:'rgba(205, 205, 205, 0.8)'
  };
  const textStyle = {
    color: 'rgba(100, 186, 255,1)',
    padding: 0,
    margin: 15,
  };
  const inputStyle = {
    width: '250px',
    height: '30px',
    borderRadius: '15px',
    border: '2px solid rgba(100, 186, 255,1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: '3px',
    textIndent: '15px',
  };
  const circleStyle = {
    display: 'inline-block',
    padding: '0px',
    margin: '10px',
    flex: '1',
    left: '50%',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    background: 'grey',
  };
  const signupButtonStyle = {
    width: '250px',
    height: '30px',
    borderRadius: '15px',
    border: '2px solid rgba(100, 186, 255,1)',
    backgroundColor: 'rgba(100, 186, 255,1)',
    margin: '3px',
    color: 'rgba(255, 255, 255,1)',
    fontWeight: 'bold',
    fontSize: '15px',
  };

  return (
    <div style={background}>
      <div style={style}>
        <h1 style={textStyle}>Onit</h1>
        <h4 style={textStyle}>Make your future</h4>
        <div style={mainStyle}>
          <input style={inputStyle} placeholder='Email' />
          <br />
          <input style={inputStyle} placeholder='Password' />
          <br />
          <br />

          <RenderLoginPage />

          <br />
          <button style={signupButtonStyle} type='button'>
            Sign up
          </button>
          <br />
          <h5>
            Dont Have an Account?
            <button type='button'>Sign up</button>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Signin;
