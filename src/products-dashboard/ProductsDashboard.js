import React, { Component } from 'react';
import ProductListContainer from './product-list/ProductListContainer';
import './ProductsDashboard.css';

export default class ProductsDashboard extends Component {
  
  render() {
    return (
      <div>
        <div className="shop-name">
            <h1 className="title">Venda Dois Amigos</h1>
        </div>
        <div className="container">
          <ProductListContainer />
        </div>
      </div>
    )
  }
}