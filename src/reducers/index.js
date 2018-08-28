import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer';
import ProductDetailReducer from './ProductDetailReducer';

const rootReducer = combineReducers({
  products: ProductsReducer,
  productDetail: ProductDetailReducer
});

export default rootReducer;