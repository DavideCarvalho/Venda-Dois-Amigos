import React, {Component} from 'react';
import CardFormFieldComponent from './CardFormFieldComponent/CardFormFieldComponent';

class CardForm extends Component {

  checkIfCardNumberIsValid({ propertyKey, value }) {
    if (!Number.isInteger(Number(value))) {
      value = value.substring(0, value.length - 1);
      return;
    }
    this.props.changeCardState({propertyKey, value});
  }

  checkIfExpirationDateIsValid({ propertyKey, value }) {
    if (value.length < 3) {
      if (!Number.isInteger(Number(value))) 
        value = value.substring(0, value.length - 1);
      this.props.changeCardState({propertyKey, value});
      return;
    }
    if (value.length === 3 && value[2] === '/') {
      value = value.substring(0, value.length - 1);
      this.props.changeCardState({propertyKey, value});
      return;
    }
    const firsTwoNumbers = value.substring(0, 2);
    let rest = value.substring(2, value.length);
    if (rest.length === 1 && !Number.isInteger(Number(rest))) 
      return;
    if (rest[0] === "/") {
      rest = rest.substring(1, 3);
      if (!Number.isInteger(Number(rest))) 
        return
      }
    value = `${firsTwoNumbers}/${rest}`;
    this.props.changeCardState({propertyKey, value})
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-12">
          <CardFormFieldComponent changeCardFocus={e => this.props.changeCardFocus(e)} changeCardState={e => this.checkIfCardNumberIsValid(e)} fieldName={'Número'} propertyKey={'number'} value={this.props.productDetail.cardInformation.number} maxLength={16}/>
        </div>
        <div className="column is-6">
          <CardFormFieldComponent changeCardFocus={e => this.props.changeCardFocus(e)} changeCardState={e => this.checkIfExpirationDateIsValid(e)} fieldName={'Validade'} propertyKey={'expirationDate'} value={this.props.productDetail.cardInformation.expirationDate}/>
        </div>
        <div className="column is-6">
          <CardFormFieldComponent changeCardFocus={e => this.props.changeCardFocus(e)} changeCardState={e => this.props.changeCardState(e)} fieldName={'CVV'} propertyKey={'cvc'} value={this.props.productDetail.cardInformation.cvc}/>
        </div>
        <div className="column is-12">
          <CardFormFieldComponent changeCardFocus={e => this.props.changeCardFocus(e)} changeCardState={e => this.props.changeCardState(e)} fieldName={'Nome'}  propertyKey={'holderName'} value={this.props.productDetail.cardInformation.holderName}/>
        </div>
      </div>
    )
  }
}

export default CardForm;