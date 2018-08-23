import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProductsDashboard from './products-dashboard/ProductsDashboard';
import App from './App';

const Routes = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path='/' component={ProductsDashboard}/>
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routes;