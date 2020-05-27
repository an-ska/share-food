import React, { useEffect, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPowerOff,
  faUserCircle,
  faPlus,
  faMinus,
  faShoppingCart,
  faTrash,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import Auth from '../../views/Auth/Auth';
import ShareFood from '../../views/ShareFood/ShareFood';
import AddOffer from '../../views/AddOffer/AddOffer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../../views/Profile/Profile';
import { authCheckState } from '../../store/actions/auth';

library.add(
  faPowerOff,
  faUserCircle,
  faPlus,
  faMinus,
  faShoppingCart,
  faTrash,
  faLongArrowAltLeft
);

const App = () => {
  const dispatch = useDispatch();
  const tryAutoLogin = useCallback(() => dispatch(authCheckState()), [
    dispatch,
  ]);

  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

  const isAuthenticated = useSelector(state => state.auth.accessToken !== null);

  let routes;

  if (!isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );
  }

  if (isAuthenticated) {
    routes = (
      <>
        <Header />
        <Switch>
          <Route path='/add-offer' component={AddOffer} />
          <Route path='/offers' component={ShareFood} />
          <Route path='/profile' component={Profile} />
          <Redirect to='/offers' />
        </Switch>
        <Footer />
      </>
    );
  }

  return <div className='App'>{routes}</div>;
};

export default App;
