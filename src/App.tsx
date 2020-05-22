import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { DashBoardPage } from './pages/DashBoardPage';
import { HotelPage } from './pages/HotelPage';
import { LoginPage } from './pages/LoginPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' component={DashBoardPage} />
          <Route path='/hotels' component={HotelPage} />
          <Route path='/hotels/:id' component={HotelPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}