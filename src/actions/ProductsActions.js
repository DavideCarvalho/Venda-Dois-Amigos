import products from '../mock-data/products';

export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';
export const fetchInitialData = () => 
  dispatch => {
    dispatch({
      type: FETCH_INITIAL_DATA,
      payload: products
    })
 };