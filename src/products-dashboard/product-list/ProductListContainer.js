import React, { Component } from 'react'
import products from '../../mock-data/products';
import ProductCardComponent from '../product-card/ProductCardComponent';


export default class ProductList extends Component {

  componentWillMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div className="columns is-multiline">
        { this.props.products.products.map((item, id) => <ProductCardComponent key={id} product={item}/> ) }
      </div>
    )
  }
}
