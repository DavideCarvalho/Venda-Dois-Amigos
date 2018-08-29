import React from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageSrc = `images/${product.image}.jpg`;
  return (
    <div className="column is-3">
      <figure className="image is-3by4" style={{marginBottom: '10px'}}>
        <img
          src={imageSrc}
          alt={product.name}
        />
      </figure>
      <Link className="subtitle is-6 is-spaced" to={`/product/${product.name}`}>{ product.name }</Link>
      <br/>
      <span style={{fontSize: 'small', fontWeight: 'bold'}}>{product.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
    </div>
  );
};

export default ProductCard;
