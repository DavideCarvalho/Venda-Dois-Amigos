import CardForm from './CardFormContainer';
import { connect } from 'react-redux';
import { changeCardFocus, changeCardState } from '../../actions/ProductDetailActions';

const mapStateToProps = (state) => {
  return {
    productDetail: state.productDetail
  }
}

export default connect(mapStateToProps, { changeCardFocus, changeCardState })(CardForm);