import React from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageSrc = `images/${product.name.toLowerCase()}.jpg`;
  return (
    <div className="column is-3">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={imageSrc}
              alt={product.name}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <Link className="subtitle is-5 is-spaced" to={'/product/saia'}>{ product.name }</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
