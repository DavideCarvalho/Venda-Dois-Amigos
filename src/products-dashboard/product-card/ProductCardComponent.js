import React from "react";

const ProductCard = ({ product }) => {
  const imageSrc = `${product.name.toLowerCase()}.jpg`;
  return (
    <div className="column is-3">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={imageSrc}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="subtitle is-5 is-spaced">{ product.name }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
