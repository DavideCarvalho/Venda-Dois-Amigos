import React from 'react';

const CardFormField = ({changeCardFocus, changeCardState, value}) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Número</label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              onFocus={() => changeCardFocus("number")}
              onChange={e => changeCardState("number", e.target.value)}
              value={value}
              className="input is-rounded"
              type="text"
              placeholder="Numero no cartão"
              maxLength="16"/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardFormField;