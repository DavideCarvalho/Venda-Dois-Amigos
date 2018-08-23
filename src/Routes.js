import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductsDashboard from './products-dashboard/ProductsDashboard';
import App from './App';

const Routes = () => (
  <App>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ProductsDashboard}/>
      </Switch>
    </BrowserRouter>
  </App>
);