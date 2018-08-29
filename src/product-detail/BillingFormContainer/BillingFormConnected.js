import BillingForm from './BillingFormContainer';
import { connect } from 'react-redux';
import { changeBillingState } from '../../actions/ProductDetailActions';

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail
  }
}

export default connect(mapStateToProps, { changeBillingState })(BillingForm);