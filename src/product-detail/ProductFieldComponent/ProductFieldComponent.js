import React from 'react';

const ProductField = ({fieldName, fieldValue}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{fieldName}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <p className='subtitle is-4'>{fieldValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductField;