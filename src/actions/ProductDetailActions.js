export const CHANGE_CARD_STATE = 'CHANGE_CARD_STATE';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const CHANGE_CARD_FOCUS = 'CHANGE_CARD_FOCUS';
export const LOAD_PRODUCT_DETAIL = 'LOAD_PRODUCT_DETAIL';
export const BUY_PRODUCT = 'BUY_PRODUCT';
export const CARD_INFORMATION_DEFAULT_VALUES = 'CARD_INFORMATION_DEFAULT_VALUES';
export const CUSTOMER_INFORMATION_DEFAULT_VALUES = 'CUSTOMER_INFORMATION_DEFAULT_VALUES';
export const NEXT = 'NEXT';
export const PREVIOUS = 'PREVIOUS';
export const CHANGE_BILLING_STATE = 'CHANGE_BILLING_STATE';

export const changeCardState = ({propertyKey, value}) =>  
  dispatch => {
    dispatch({
      type: CHANGE_CARD_STATE,
      payload: {
        propertyKey,
        value
      }
    });
  }

  export const changeBillingState = ({propertyKey, value}) =>  
  dispatch => {
    dispatch({
      type: CHANGE_BILLING_STATE,
      payload: {
        propertyKey,
        value
      }
    });
  }

export const changeCardFocus = ({focusedKey}) =>
  dispatch => {
    dispatch({
      type: CHANGE_CARD_FOCUS,
      payload: {
        focusedKey
      }
    });
  }

export const next = (currentState) =>
  dispatch => {
    dispatch({
      type: NEXT,
      payload: {
        state: currentState + 1
      }
    })
  }

export const previous = (currentState) =>
  dispatch => {
    dispatch({
      type: PREVIOUS,
      payload: {
        state: currentState - 1
      }
    })
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

export const buyProduct = () =>
  dispatch => {
    dispatch({
      type: BUY_PRODUCT,
      payload: {}
    })
  }

export const cardInformationDefaultValues = () =>
  dispatch => {
    
    dispatch({
      type: CARD_INFORMATION_DEFAULT_VALUES,
      payload: {
        holderName: 'João',
        number: '5580400514542835',
        expirationDate: '08/19',
        cvc: '124',
        cpf: '36945222047'
      }
    })
  }

export const customerInformationDefaultValues = () =>
  dispatch => {
    dispatch({
      type: CUSTOMER_INFORMATION_DEFAULT_VALUES,
      payload: {
        completeName: 'João da Silva Flores',
        phoneNumber: '+5513988567483',
        email: 'joao.flores@gmail.com',
        cpf: '36945222047'
      }
    })
  }

export const buyRequest = ({productDetail: {cardInformation, customerInformation}}) =>
  dispatch => {

  }