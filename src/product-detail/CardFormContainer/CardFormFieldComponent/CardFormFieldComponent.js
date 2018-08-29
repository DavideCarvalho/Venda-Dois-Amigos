import React from 'react';

const CardFormField = ({changeCardFocus, changeCardState, fieldName, propertyKey, value, maxLength}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{fieldName}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              onFocus={e => changeCardFocus({focusedKey: propertyKey})}
              onChange={e => changeCardState({propertyKey, value: e.target.value})}
              value={value}
              className="input is-rounded"
              type="text"
              placeholder={value}
              maxLength={maxLength}/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardFormField;