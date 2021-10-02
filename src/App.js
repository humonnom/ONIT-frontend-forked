import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageWrapper } from './components';
import {
  NormalModePage,
  EditModePage,
  LoginPage,
  KakaoCallback,
} from './pages';
import { SERVER_URI, REFRESH_TOKEN } from './utils/constantValue';

function App() {
  async function renewAccessToken() {
    const fetchedData = await fetch(`${SERVER_URI}/token/refresh`, {
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
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <div>
              <button
                type='button'
                onClick={() => window.location.assign('/normal')}
              >
                my homepage
              </button>
              <button
                type='button'
                onClick={() => window.location.assign('/login')}
              >
                login
              </button>
              <button type='button' onClick={renewAccessToken}>
                토큰 재발급
              </button>
            </div>
          </Route>
          <Route exact path='/callback/kakao'>
            <KakaoCallback />
          </Route>
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
