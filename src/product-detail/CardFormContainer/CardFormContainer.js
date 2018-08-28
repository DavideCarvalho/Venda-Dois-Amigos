import React, {Component} from 'react';
import CardFormFieldComponent from './CardFormFieldComponent/CardFormFieldComponent';

export default class CardForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formatedColors: '',
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      cpf: '',
      focused: "number"
    }
  }

  componentWillMount() {
    const { productName } = this.props.params.match;
  }
  render() {
    return (
      <div>
        <div className="column is-12">
          <CardFormFieldComponent changeCardFocus={e => this.props.changeCardFocus(e)} changeCardState={e => this.props.changeCardState(e)} value={this.props.product.name}/>
        </div>
        <div className="column is-12">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Nome</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    onFocus={() => this.changeCardFocus("name")}
                    onChange={e => this.changeCardState("name", e.target.value)}
                    value={this.state.name}
                    className="input is-rounded"
                    type="email"
                    placeholder="Nome no cartão"/>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-12">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Data de expiração</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    onFocus={() => this.changeCardFocus("expiry")}
                    onChange={e => this.changeCardState("expiry", e.target.value)}
                    value={this.state.expiry}
                    className="input is-rounded"
                    type="text"
                    maxLength="5"
                    placeholder="Data de expiração"/>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-12">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">CVV</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    onFocus={() => this.changeCardFocus("cvc")}
                    onBlur={() => this.changeCardFocus("number")}
                    onChange={e => this.changeCardState("cvc", e.target.value)}
                    value={this.state.cvc}
                    className="input is-rounded"
                    maxLength="3"
                    placeholder="CVV"/>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-12">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">CPF</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-rounded"
                    type="text"
                    placeholder="CPF"
                    onChange={e => this.changeCardState("cpf", e.target.value)}
                    value={this.state.cpf}
                    maxLength="11"/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}