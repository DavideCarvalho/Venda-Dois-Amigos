import React, { Component } from 'react';
import ProductListConnected from './product-list/ProductListConnected';
import './ProductsDashboard.css';

export default class ProductsDashboard extends Component {
  
  render() {
    return (
      <div>
        <div className="shop-name">
            <h1 className="title">Dois Amigos</h1>
            <hr />
        </div>
        <div className="container">
          <ProductListConnected />
        </div>
      </div>
    )
  }
}