import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProductsDashboard from './products-dashboard/ProductsDashboard';
import ProductDetail from './product-detail/ProductDetail';
import App from './App';

const Routes = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path='/' component={ProductsDashboard}/>
        <Route path='/product/:productName' component={ProductDetail}/>
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routes;