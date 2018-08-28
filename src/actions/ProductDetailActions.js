export const CHANGE_CARD_STATE = 'CHANGE_CARD_STATE';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const CHANGE_CARD_FOCUS = 'CHANGE_CARD_FOCUS';
export const LOAD_PRODUCT_DETAIL = 'LOAD_PRODUCT_DETAIL';

export const changeCardState = (key, value) =>  
  dispatch => {
    dispatch({
      type: CHANGE_CARD_STATE,
      payload: {
        key,
        value
      }
    });
  }

export const changeCardFocus = (focusedKey) =>
  dispatch => {
    dispatch({
      type: CHANGE_CARD_FOCUS,
      payload: {
        focusedKey
      }
    });
  }

export const loadProductDetail = (productName) => 
  dispatch => {
    dispatch({
      type: LOAD_PRODUCT_DETAIL,
      payload: {
        productName
      }
    })
  }