import { SELECT_PRODUCT, CHANGE_CARD_STATE, CHANGE_CARD_FOCUS, BUY_PRODUCT, NEXT, CARD_INFORMATION_DEFAULT_VALUES, CHANGE_BILLING_STATE, CUSTOMER_INFORMATION_DEFAULT_VALUES, PREVIOUS } from '../actions/ProductDetailActions';

const INITIAL_STATE = {
  focused: 'number',
  buying: false,
  state: 0,
  product: {
    name: '',
    value: '',
    description: '',
    colors: [],
    formatedColors: '',
    freight: ''
  },
  cardInformation: {
    holderName: '',
    number: '',
    expirationDate: '',
    cvc: '',
    cpf: ''
  },
  customerInformation: {
    completeName: '',
    phoneNumber: '',
    email: '',
    cpf: ''
  }
}
export default(state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SELECT_PRODUCT:
      return {...state, product: payload};
    case CHANGE_CARD_STATE:
      return {...state, cardInformation: {
        ...state.cardInformation, [payload.propertyKey]: payload.value
      }};
    case CHANGE_BILLING_STATE:
      return {...state, customerInformation: {
        ...state.customerInformation, [payload.propertyKey]: payload.value
      }};
    case CHANGE_CARD_FOCUS:
      return{...state, focused: payload.focusedKey};
    case BUY_PRODUCT:
      return{...state, 
        buying: true,
        state: 1
      };
    case CARD_INFORMATION_DEFAULT_VALUES:
      return {...state, cardInformation: payload}
    case CUSTOMER_INFORMATION_DEFAULT_VALUES:
      return {...state, customerInformation: payload}
    case NEXT:
      return{...state, state: payload.state}
    case PREVIOUS:
      return {...state, state: payload.state}
    default:
      return state;
  }
}