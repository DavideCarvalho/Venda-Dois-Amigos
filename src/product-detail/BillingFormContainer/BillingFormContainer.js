import React, { Component } from 'react';
import BillingFormFieldComponent from './BillingFormFieldComponent/BillingFormFieldComponent';

export default class BillingForm extends Component {
  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-12">
          <BillingFormFieldComponent changeBillingState={e => this.props.changeBillingState(e)} fieldName={'Nome Completo'}  propertyKey={'completeName'} value={this.props.productDetail.customerInformation.completeName}/>
        </div>
        <div className="column is-12">
          <BillingFormFieldComponent changeBillingState={e => this.props.changeBillingState(e)} fieldName={'CPF'}  propertyKey={'cpf'} value={this.props.productDetail.customerInformation.cpf}/>
        </div>
        <div className="column is-12">
          <BillingFormFieldComponent changeBillingState={e => this.props.changeBillingState(e)} fieldName={'Telefone'} propertyKey={'phoneNumber'} value={this.props.productDetail.customerInformation.phoneNumber}/>
        </div>
        <div className="column is-12">
          <BillingFormFieldComponent changeBillingState={e => this.props.changeBillingState(e)} fieldName={'Email'} propertyKey={'email'} value={this.props.productDetail.customerInformation.email}/>
        </div>
      </div>
    )
  }
}