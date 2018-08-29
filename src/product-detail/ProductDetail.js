import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cards from 'react-credit-cards';
import * as pagarme from 'pagarme';
import * as iziToast from 'izitoast';
import BillingFormConnected from './BillingFormContainer/BillingFormConnected';
import ProductField from './ProductFieldComponent/ProductFieldComponent';
import CardFormConnected from './CardFormContainer/CardFormConnected';
import 'react-credit-cards/es/styles-compiled.css';
import products from '../mock-data/products';
import { API_KEY } from '../config';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: ""
      },
    };
  }

  async componentWillMount() {
    const {productName} = this.props.match.params;
    const [product] = products.filter(product => product.name === productName);
    const image = require(`../images/${product.image}.jpg`);
    let formatedColors = '';
    product.colors.forEach((color, index) => {
      if (index + 1 === product.colors.length) {
        formatedColors += `${color}`
        return;
      }
      formatedColors += `${color},`
    });
    this.setState(() => {
      return {product, image, formatedColors}
    });
  }

  render() {
    return (
      <div>
        <div className="container" style={{marginTop: '1%'}}>
          <div className="columns is-multiline">
            <div className="column">
              <figure className="image is-5by6 is-pulled-right" style={{width: '70%'}}>
                <img src={this.state.image} alt={this.state.product.name}/>
              </figure>
            </div>
            <div className="column">
              {this.renderProductDetails()}
              {this.renderCard()}
              <br/>
              {this.renderFormState()}
              {this.renderBuyButton()}
              {this.renderNextButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCard() {
    if (this.props.productDetail.buying && this.props.productDetail.state === 1)
      return (
        <div className="column is-12" style={{display: 'inline-grid'}}>
          <Cards
                number={this.props.productDetail.cardInformation.number}
                name={this.props.productDetail.cardInformation.holderName}
                expiry={this.props.productDetail.cardInformation.expirationDate}
                cvc={this.props.productDetail.cardInformation.cvc}
                focused={this.props.productDetail.focused}
          />
          <button
            onClick={() => this.props.cardInformationDefaultValues()}
            style={{margin: 'auto', marginTop: '4px'}}
            className="button is-info is-outlined">
              Carregar cartão
          </button>
        </div>
      )
  }

  renderBuyButton() {
    if (this.props.productDetail.state === 0)
      return (
        <div>
          <Link
            className="button is-outlined is-danger"
            style={{marginRight: '10px'}}
            to={'/'}
          >
            Cancelar
          </Link>
          <button
            className="button is-outlined is-primary is-pulled-right"
            onClick={() => this.buyProduct(this.props)}>
            Comprar
          </button>
        </div>
      )
  }

  renderFormState() {
    if(this.props.productDetail.buying) {
      if(this.props.productDetail.state === 1) {
        return <CardFormConnected />
      }
      if(this.props.productDetail.state === 2) {
        return (
          <div>
            <button
            onClick={() => this.props.customerInformationDefaultValues()}
            className="button is-info is-outlined is-pulled-left">
              Carregar usuário salvo
            </button>
            <BillingFormConnected />
          </div>
        )
      }
    }
  }

  renderNextButton() {
    if (this.props.productDetail.buying) {
      if(this.props.productDetail.state === 1) {
        return (
          <div>
            <button
            onClick={() => this.props.previous(this.props.productDetail.state)}
            className="button is-info is-outlined is-pulled-left">
              Voltar
            </button>
            <button
            onClick={() => this.props.next(this.props.productDetail.state)}
            className="button is-success is-outlined is-pulled-right">
              Próximo
            </button>
          </div>
        )
      }
      if(this.props.productDetail.state === 2) {
        return (
          <div>
            <button
            onClick={() => this.props.previous(this.props.productDetail.state)}
            className="button is-info is-outlined is-pulled-left">
              Voltar
            </button>
            <button
            onClick={() => this.sendBuyRequest(this.props)}
            className="button is-success is-outlined is-pulled-right">
              Comprar
            </button>
          </div>
        )
      }
    }
  }

  async sendBuyRequest({productDetail: {cardInformation, customerInformation}}) {
    let expiry = cardInformation.expirationDate;
    expiry = expiry.substring(0, 2) + expiry.substring(3, expiry.length);
    const phoneNumbers = [];
    phoneNumbers.push(customerInformation.phoneNumber);
    try {
      const client = await pagarme
        .client
        .connect({api_key: API_KEY});
      const transaction = await client
        .transactions
        .create({
          amount: 100,
          card_number: cardInformation.number,
          card_cvv: cardInformation.cvc,
          card_expiration_date: expiry,
          card_holder_name: cardInformation.holderName,
          customer: {
            external_id: "#3311",
            name: customerInformation.completeName,
            type: "individual",
            country: "br",
            email: customerInformation.email,
            documents: [
              {
                type: "cpf",
                number: customerInformation.cpf
              }
            ],
            phone_numbers: phoneNumbers,
            birthday: "1996-10-25"
          },
          billing: {
            name: "Trinity Moss",
            address: {
              country: "br",
              state: "sp",
              city: "Cotia",
              neighborhood: "Rio Cotia",
              street: "Rua Matrix",
              street_number: "9999",
              zipcode: "06714360"
            }
          },
          shipping: {
            name: "Neo Reeves",
            fee: 1000,
            delivery_date: "2000-12-21",
            expedited: true,
            address: {
              country: "br",
              state: "sp",
              city: "Cotia",
              neighborhood: "Rio Cotia",
              street: "Rua Matrix",
              street_number: "9999",
              zipcode: "06714360"
            }
          },
          items: [
            {
              id: "r123",
              title: this.state.product.name,
              unit_price: Math.floor(this.state.product.value),
              quantity: 1,
              tangible: true
            }
          ],
          split_rules: [
            {
              recipient_id: "re_cjlei943y016xf96e1bc4jv1x",
              percentage: 25,
              liable: true,
              charge_processing_fee: true
            },
            {
              recipient_id: "re_cjlc7hst2009lu16d5a93zsff",
              percentage: 15,
              liable: true,
              charge_processing_fee: true
            }, {
              recipient_id: "re_cjlei9ni8016zf96e97gfnd6l",
              percentage: 60,
              liable: true,
              charge_processing_fee: true
            }
          ]
        });
      console.log(transaction);
      if (transaction.status === 'paid') {
        iziToast.success({title: 'Comprado', message: 'Produto comprado com sucesso!'});
      }
    } catch (e) {
      console.log(e.response);
    }
  }

  renderProductDetails() {
    if (this.props.productDetail.state === 0)
      return (
        <div>
          <p className="title" style={{fontSize: 'x-large'}}>{this.state.product.name}</p>
          <hr style={{marginBottom: '10px', marginTop: '10px'}}/>
          <ProductField
            fieldName={'Valor'}
            fieldValue={`${this.state.product.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`}/>
          <br/>
          <ProductField
            fieldName={'Descrição'}
            fieldValue={this.state.product.description}/>
          <br/>
          <ProductField fieldName={'Cores'} fieldValue={this.state.formatedColors}/>
          <br/>
          <ProductField fieldName={'Frete'} fieldValue={`${this.state.product.freight.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`}/>
          <br/>
        </div>
      )
  }

  async buyProduct({productDetail: { cardInformation }}) {
    // card number 5580400514542835 expiration date 0819 holder name João cvv 124
    // cpf 36945222047
    // console.log(productDetail);
    this.props.buyProduct();
    // let expiry = cardInformation.expirationDate;
    // expiry = expiry.substring(0, 2) + expiry.substring(3, expiry.length);
    // try {
    //   const client = await pagarme
    //     .client
    //     .connect({api_key: API_KEY});
    //   const transaction = await client
    //     .transactions
    //     .create({
    //       amount: 100,
    //       card_number: cardInformation.number,
    //       card_cvv: cardInformation.cvc,
    //       card_expiration_date: expiry,
    //       card_holder_name: cardInformation.holderName,
    //       customer: {
    //         external_id: "#3311",
    //         name: "João",
    //         type: "individual",
    //         country: "br",
    //         email: "joao_teste@hotmail.com",
    //         documents: [
    //           {
    //             type: "cpf",
    //             number: cardInformation.cpf
    //           }
    //         ],
    //         phone_numbers: ["+5513981456345"],
    //         birthday: "1996-10-25"
    //       },
    //       billing: {
    //         name: "Trinity Moss",
    //         address: {
    //           country: "br",
    //           state: "sp",
    //           city: "Cotia",
    //           neighborhood: "Rio Cotia",
    //           street: "Rua Matrix",
    //           street_number: "9999",
    //           zipcode: "06714360"
    //         }
    //       },
    //       shipping: {
    //         name: "Neo Reeves",
    //         fee: 1000,
    //         delivery_date: "2000-12-21",
    //         expedited: true,
    //         address: {
    //           country: "br",
    //           state: "sp",
    //           city: "Cotia",
    //           neighborhood: "Rio Cotia",
    //           street: "Rua Matrix",
    //           street_number: "9999",
    //           zipcode: "06714360"
    //         }
    //       },
    //       items: [
    //         {
    //           id: "r123",
    //           title: "Red pill",
    //           unit_price: 50,
    //           quantity: 1,
    //           tangible: true
    //         }
    //       ],
    //       split_rules: [
    //         {
    //           recipient_id: "re_cj6cglnhc0bbcbt6dbsl8fdcs",
    //           percentage: 50,
    //           liable: true,
    //           charge_processing_fee: true
    //         }, {
    //           recipient_id: "re_cj6cgqzy31irpmx6dj9h3xdln",
    //           percentage: 50,
    //           liable: true,
    //           charge_processing_fee: true
    //         }
    //       ]
    //     });
    //   console.log(transaction);
    //   if (transaction.status === 'paid') {
    //     iziToast.success({title: 'Comprado', message: 'Produto comprado com sucesso!'});
    //   }
    // } catch (e) {}
    // pagarme.client   .connect({ api_key: API_KEY })   .then(client =>
    // client.transactions.create({       amount: 100,       card_number:
    // state.number,       card_cvv: state.cvc,       card_expiration_date: expiry,
    //   card_holder_name: state.name,       customer: {         external_id:
    // "#3311",         name: "João",         type: "individual",         country:
    // "br",         email: "joao_teste@hotmail.com",         documents: [ { type:
    // "cpf",             number: state.cpf           } ], phone_numbers:
    // ["+5513981456345"],         birthday: "1996-10-25"      },   billing: {
    // name: "Trinity Moss",         address: {       country: "br", state: "sp",
    //        city: "Cotia",  neighborhood: "Rio Cotia", street: "Rua Matrix",
    // street_number: "9999", zipcode: "06714360"         }    }, shipping: {
    //  name: "Neo Reeves",         fee: 1000, delivery_date: "2000-12-21",
    // expedited: true,         address: { country: "br",           state: "sp",
    // city: "Cotia", neighborhood: "Rio Cotia",           street: "Rua Matrix",
    // street_number: "9999", zipcode: "06714360"         }       }, items: [
    //  {           id: "r123",           title: "Red pill", unit_price: 50,
    //   quantity: 1,         tangible: true         },     {           id: "b123",
    // title: "Blue pill", unit_price: 50,       quantity: 1,           tangible:
    // true         }   ]     })   ) .then(transaction => console.log(transaction));
  }
}
