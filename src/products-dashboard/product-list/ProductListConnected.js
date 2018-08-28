import ProductList from './ProductListContainer';
import { connect } from 'react-redux';
import { fetchInitialData } from '../../actions/ProductsActions';

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, { fetchInitialData })(ProductList);