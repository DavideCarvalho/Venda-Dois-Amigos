import ProductDetail from './ProductDetail';
import { connect } from 'react-redux';
import { buyProduct, cardInformationDefaultValues, next, previous, customerInformationDefaultValues } from '../actions/ProductDetailActions';

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail
  }
}

export default connect(mapStateToProps, { buyProduct, cardInformationDefaultValues, next, customerInformationDefaultValues, previous })(ProductDetail);