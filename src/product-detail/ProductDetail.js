import React, {Component} from 'react'
import products from '../mock-data/products';
import { API_KEY, ENCRIPT_KEY } from '../config';
import * as pagarme from 'pagarme';

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc: '',
      product: {
        name: ''
      }
    };
  }

  async componentWillMount() {
    const {productName} = this.props.match.params;
    const [product] = products.filter(product => product.name.toLowerCase() === productName);
    const image = require(`../images/${product.name.toLowerCase()}.jpg`);
    this.setState({product, image});
    const body = {
      "amount": 21000,
      "card_number": "5580 4005 1454 2835",
      "card_cvv": "124",
      "card_expiration_date": "0819",
      "card_holder_name": "Morpheus Fishburne",
      "customer": {
        "external_id": "#3311",
        "name": "Morpheus Fishburne",
        "type": "individual",
        "country": "br",
        "email": "mopheus@nabucodonozor.com",
        "documents": [
          {
            "type": "cpf",
            "number": "00000000000"
          }
        ],
        "phone_numbers": [
          "+5511999998888", "+5511888889999"
        ],
        "birthday": "1965-01-01"
      },
      "billing": {
        "name": "Trinity Moss",
        "address": {
          "country": "br",
          "state": "sp",
          "city": "Cotia",
          "neighborhood": "Rio Cotia",
          "street": "Rua Matrix",
          "street_number": "9999",
          "zipcode": "06714360"
        }
      },
      "shipping": {
        "name": "Neo Reeves",
        "fee": 1000,
        "delivery_date": "2000-12-21",
        "expedited": true,
        "address": {
          "country": "br",
          "state": "sp",
          "city": "Cotia",
          "neighborhood": "Rio Cotia",
          "street": "Rua Matrix",
          "street_number": "9999",
          "zipcode": "06714360"
        }
      },
      "items": [
        {
          "id": "r123",
          "title": "Red pill",
          "unit_price": 10000,
          "quantity": 1,
          "tangible": true
        }, {
          "id": "b123",
          "title": "Blue pill",
          "unit_price": 10000,
          "quantity": 1,
          "tangible": true
        }
      ],
      "split_rules": [
        {
          "recipient_id": "re_cj6cglnhc0bbcbt6dbsl8fdcs",
          "percentage": 50,
          "liable": true,
          "charge_processing_fee": true
        }, {
          "recipient_id": "re_cj6cgqzy31irpmx6dj9h3xdln",
          "percentage": 50,
          "liable": true,
          "charge_processing_fee": true
        }
      ]
    };
    // const response = await axios.post('https://api.pagar.me/1/transactions', body);
    // console.log(response);
    // const client = await pagarme.client.connect({api_key: API_KEY});
    // console.log(client);
    // const transaction = await client.transaction.create(body);
    // console.log(transaction);
    pagarme.client.connect({ api_key: API_KEY })
  .then(client => client.transactions.create({
    "amount": 100,
    "card_number": "5580400514542835",
    "card_cvv": "124",
    "card_expiration_date": "0819",
    "card_holder_name": "João",
    "customer": {
      "external_id": "#3311",
      "name": "João",
      "type": "individual",
      "country": "br",
      "email": "joao_teste@hotmail.com",
      "documents": [
        {
          "type": "cpf",
          "number": "36945222047"
        }
      ],
      "phone_numbers": ["+5513981456345"],
      "birthday": "1996-10-25"
    },
    "billing": {
      "name": "Trinity Moss",
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "shipping": {
      "name": "Neo Reeves",
      "fee": 1000,
      "delivery_date": "2000-12-21",
      "expedited": true,
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "items": [
      {
        "id": "r123",
        "title": "Red pill",
        "unit_price": 50,
        "quantity": 1,
        "tangible": true
      },
      {
        "id": "b123",
        "title": "Blue pill",
        "unit_price": 50,
        "quantity": 1,
        "tangible": true
      }
    ]
  }))
  .then(transaction => console.log(transaction))
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">
              <figure className="image">
                <img src={this.state.image} alt={this.state.product.name}/>
              </figure>
            </div>
            <div className="column">
              <p className="title is-2">Detalhes do produto</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
