import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProductsDashboard from './products-dashboard/ProductsDashboard';
import ProductDetail from './product-detail/ProductDetail';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const Routes = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Switch>
          <Route exact path='/' component={ProductsDashboard}/>
          <Route path='/product/:productName' component={ProductDetail}/>
        </Switch>
      </App>
    </Provider>
  </BrowserRouter>
);

export default Routes;