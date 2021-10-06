import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageWrapper } from './components';
import {
  NormalModePage,
  EditModePage,
  LoginPage,
  KakaoCallback,
  Main,
} from './pages';

// 여기
// require('dotenv').config();

function App() {
  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/callback/kakao'>
            <KakaoCallback />
          </Route>
          {/* <Route exact path='/redux'>
            <div>
              <h3>{reduxTestString}</h3>
              <input type='input' onChange={}/>
              <button type='button' onClick={handleClick}>
                save
              </button>
            </div>
          </Route> */}
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/normal'>
            <NormalModePage />
          </Route>
          <Route exact path='/edit'>
            <EditModePage />
          </Route>
          <Route exact path='/'>
            <EditModePage />
          </Route>
          <Route path='/'>
            <div>error</div>
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
