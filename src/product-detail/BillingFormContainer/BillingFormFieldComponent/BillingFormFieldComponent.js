import React from 'react';

const CardFormField = ({changeBillingState, fieldName, propertyKey, value}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{fieldName}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              onChange={e => changeBillingState({propertyKey, value: e.target.value})}
              value={value}
              className="input is-rounded"
              type="text"
              placeholder={value}/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardFormField;