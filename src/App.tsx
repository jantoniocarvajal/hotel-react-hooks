import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { DashBoardPage } from './pages/DashBoardPage';
import { HotelPage } from './pages/HotelPage';
import { LoginPage } from './pages/LoginPage';
import { MapProvider } from './contexts/MapState';
import PrivateRoute from './helper/PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <MapProvider>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={LoginPage} />
            <PrivateRoute path='/dashboard' component={DashBoardPage} />
            <PrivateRoute path='/hotels' component={HotelPage} />
            <PrivateRoute path='/hotels/:id' component={HotelPage} />
          </Switch>
        </BrowserRouter>
      </MapProvider>
    )
  }
}