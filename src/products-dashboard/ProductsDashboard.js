import React, { Component } from 'react';
import './ProductsDashboard.css';

export default class ProductsDashboard {
  
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