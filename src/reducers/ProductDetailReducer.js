import { SELECT_PRODUCT, CHANGE_CARD_STATE, CHANGE_CARD_FOCUS } from '../actions/ProductDetailActions';

const INITIAL_STATE = {
  focused: 'number',
  product: {
    name: '',
    value: '',
    description: '',
    colors: [],
    formatedColors: '',
    freight: ''
  },
  cardInformation: {
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cpf: ''
  }
}
export default(state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SELECT_PRODUCT:
      return {...state, product: payload};
    case CHANGE_CARD_STATE:
      return {...state, product: {
        [payload.key]: payload.value
      }};
    case CHANGE_CARD_FOCUS:
      return{...state, focused: payload.value};
    default:
      return state;
  }
}