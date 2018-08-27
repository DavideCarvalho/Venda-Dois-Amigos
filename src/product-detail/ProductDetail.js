import React, { Component } from 'react'
import products from '../mock-data/products';

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

  componentWillMount() {
    const { productName } = this.props.match.params;
    const [ product ] = products.filter(product => product.name.toLowerCase() === productName);
    const image = require(`../images/${product.name.toLowerCase()}.jpg`);
    this.setState({
      product,
      image
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">
              <figure className="image">
                <img 
                  src={this.state.image}
                  alt={this.state.product.name}
                />
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
