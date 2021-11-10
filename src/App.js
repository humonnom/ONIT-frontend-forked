import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageWrapper, HandleKakaoLogin, RenewAccessToken } from './components';
import {
  LoginPage,
  MainPage,
  RenderNormalPage,
  RenderEditPage,
  RenderUserName,
  SaveEditPageData,
} from './pages';

function App() {
  const id = localStorage.getItem('user_seq');

  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/main' component={MainPage} />
          <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
          <Route
            exact
            path='/:id/auth/token/refresh'
            component={RenewAccessToken}
          />
          <Route exact path='/:id/normal' component={RenderNormalPage} />
          <Route exact path='/:id/edit' component={RenderEditPage} />
          <Route exact path='/:id/save' component={SaveEditPageData} />
          <Route exact path='/:id/getname' component={RenderUserName} />
          <Route path='/'>
            <div>error</div>
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
