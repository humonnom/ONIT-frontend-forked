import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HandleKakaoLogin, RenewAccessToken } from './components';
import {
  SplashPage,
  JoinPage,
  FeedbackPage,
  SavePage,
  EditModePage,
  NormalModePage,
  LoginPage,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/join' component={JoinPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/main' component={FeedbackPage} />
        <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
        <Route
          exact
          path='/:id/auth/token/refresh'
          component={RenewAccessToken}
        />
        <Route exact path='/:id/' component={NormalModePage} />
        <Route exact path='/:id/edit' component={EditModePage} />
        <Route exact path='/:id/save' component={SavePage} />
        <Route path='/'>
          <div>error</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
