import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../components/pages/home-page/HomePage';
import FileApplicationPage from '../components/pages/file-application-page/FileApplicationPage';
import RegisterPage from '../components/pages/register-page/RegisterPage';
import LoginPage from '../components/pages/login-page/LoginPage';
import { useAppSelector } from '../hooks';
import { selectUser, UserState } from '../slices/user.slice';
import ViewPage from '../components/pages/view-application-page/ViewPage';

const AppRoutes: React.FC<unknown> = (props) => {

  const currentUser = useAppSelector<UserState>(selectUser);

  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/applications'>
        {currentUser? (
        <FileApplicationPage currentUser={currentUser}/>) : (<HomePage />)}
      </Route>
      <Route exact path='/view'>
          {currentUser? (
            <ViewPage currentUser={currentUser}/>) : (<HomePage />)
          }
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;