import React from "react";

export default function ({label, value, onChange, error, rows}) {
    return (
        <div>
            <label className={'form__label ' + (!!error ? 'form__label--error' : '')}>{label}</label>
            <textarea className={'form__input ' + (!!error ? 'form__input--has-error' : '')}
                      value={value}
                      rows={rows}
                      onChange={onChange}/>
            {!!error ? <p className='form__error'>{error}</p> : ''}
        </div>
    )
}