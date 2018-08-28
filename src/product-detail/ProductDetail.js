import React, { Component } from "react";
import Cards from "react-credit-cards";
import products from "../mock-data/products";
import { API_KEY, ENCRIPT_KEY } from "../config";
import * as pagarme from "pagarme";
import "react-credit-cards/es/styles-compiled.css";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: "",
      product: {
        name: ""
      },
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      cpf: '',
      focused: "number"
    };
  }

  async componentWillMount() {
    const { productName } = this.props.match.params;
    const [product] = products.filter(
      product => product.name.toLowerCase() === productName
    );
    const image = require(`../images/${product.name.toLowerCase()}.jpg`);
    this.setState({ product, image });
    const body = {
      amount: 21000,
      card_number: "5580 4005 1454 2835",
      card_cvv: "124",
      card_expiration_date: "0819",
      card_holder_name: "Morpheus Fishburne",
      customer: {
        external_id: "#3311",
        name: "Morpheus Fishburne",
        type: "individual",
        country: "br",
        email: "mopheus@nabucodonozor.com",
        documents: [
          {
            type: "cpf",
            number: "00000000000"
          }
        ],
        phone_numbers: ["+5511999998888", "+5511888889999"],
        birthday: "1965-01-01"
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
          title: "Red pill",
          unit_price: 10000,
          quantity: 1,
          tangible: true
        },
        {
          id: "b123",
          title: "Blue pill",
          unit_price: 10000,
          quantity: 1,
          tangible: true
        }
      ],
      split_rules: [
        {
          recipient_id: "re_cj6cglnhc0bbcbt6dbsl8fdcs",
          percentage: 50,
          liable: true,
          charge_processing_fee: true
        },
        {
          recipient_id: "re_cj6cgqzy31irpmx6dj9h3xdln",
          percentage: 50,
          liable: true,
          charge_processing_fee: true
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">
              <figure className="image is-4by5">
                <img src={this.state.image} alt={this.state.product.name} />
              </figure>
            </div>
            <div className="column">
              <p className="title is-2">Detalhes do produto</p>
              <p className="is-pulled-left">Nome: {this.state.product.name}</p>
              <br />
              <p className="is-pulled-left">
                Valor: {this.state.product.value}
              </p>
              <br />
              <p className="is-pulled-left">
                Descrição: {this.state.product.description}
              </p>
              <br />
              <p className="is-pulled-left">
                Cores: {this.state.product.colors}
              </p>
              <br />
              <p className="is-pulled-left">
                Frete: {this.state.product.freight}
              </p>
              <br />
              <Cards
                number={this.state.number}
                name={this.state.name}
                expiry={this.state.expiry}
                cvc={this.state.cvc}
                focused={this.state.focused}
              />
              <br />
              <div className="columns is-multiline">
                <div className="column is-12">
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Número</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            onFocus={() => this.changeCardFocus("number")}
                            onChange={e => this.changeCardState("number", e.target.value)}
                            value={this.state.number}
                            className="input is-rounded"
                            type="text"
                            placeholder="Numero no cartão"
                            maxLength="16"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
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
                            placeholder="Nome no cartão"
                          />
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
                            placeholder="Data de expiração"
                          />
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
                            placeholder="CVV"
                          />
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
                            maxLength="11"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="button is-primary" onClick={() => this.buyProduct(this.state)}>
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  checkInputFormat(key, value) {
    if (key === 'name') return value;
    if (key !== 'name') {
      if (key !== 'expiry') {
        if (!Number.isInteger(Number(value))) {
          value = value.substring(0, value.length - 1);
          return value;
        }
      }
    }
    if (key === "expiry") {
      if (value.length < 3) {
        if (!Number.isInteger(Number(value)))
          value = value.substring(0, value.length - 1);
          return value;
      }
      if (value.length === 3 && value[2] === '/') return value.substring(0, value.length - 1);
      const firsTwoNumbers = value.substring(0, 2);
      let rest = value.substring(2, value.length);
      if (rest.length === 1 && !Number.isInteger(Number(rest))) return value.substring(0, value.length - 1);
      if (rest[0] === "/") {
        rest = rest.substring(1, 3);
        if (!Number.isInteger(Number(rest))) return value.substring(0, value.length - 1);
      }
      return `${firsTwoNumbers}/${rest}`;
    }
    return value;
  }

  changeCardState(key, value) {
    value = this.checkInputFormat(key, value);
    this.setState(() => {
      return {
        [key]: value
      };
    });
  }

  changeCardFocus(cardState) {
    this.setState(() => {
      return {
        focused: cardState
      };
    });
  }

  buyProduct(state) {
    // card number 5580400514542835
    // expiration date 0819
    // holder name João
    // cvv 124
    // cpf 36945222047
    let expiry = state.expiry;
    expiry = expiry.substring(0, 2) + expiry.substring(3, expiry.length);
    pagarme.client
      .connect({ api_key: API_KEY })
      .then(client =>
        client.transactions.create({
          amount: 100,
          card_number: state.number,
          card_cvv: state.cvc,
          card_expiration_date: expiry,
          card_holder_name: state.name,
          customer: {
            external_id: "#3311",
            name: "João",
            type: "individual",
            country: "br",
            email: "joao_teste@hotmail.com",
            documents: [
              {
                type: "cpf",
                number: state.cpf
              }
            ],
            phone_numbers: ["+5513981456345"],
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
              title: "Red pill",
              unit_price: 50,
              quantity: 1,
              tangible: true
            },
            {
              id: "b123",
              title: "Blue pill",
              unit_price: 50,
              quantity: 1,
              tangible: true
            }
          ]
        })
      )
      .then(transaction => console.log(transaction));
  }
}
