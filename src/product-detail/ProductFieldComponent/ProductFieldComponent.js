import React from 'react';

const ProductField = ({fieldName, fieldValue}) => {
  return (
    <div>
      <label className="label">{fieldName}</label>
      <p className='subtitle is-6'>{fieldValue}</p>
    </div>
  )
}

export default ProductField;