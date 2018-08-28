import { FETCH_INITIAL_DATA } from '../actions/ProductsActions';

const INITIAL_DATA = {
  products: []
}

export default(state = INITIAL_DATA, { type, payload }) => {
  switch (type) {
    case FETCH_INITIAL_DATA:
      return { ...state, products: payload }
    default:
      return state
  }
}