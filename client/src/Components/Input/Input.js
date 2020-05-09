import React from "react";

export default function ({label, value, type, onChange, error}) {
    const isCheckboxOrRadio = () => ['checkbox', 'radio'].includes(type);
    return (
        <>
            <label className={'form__label ' + (!!error ? 'form__label--error' : '')}>{label}</label>
            <input type={type ? type : "text"}
                   className={(isCheckboxOrRadio() ? '' : 'form__input ') + (!!error ? 'form__input--has-error' : '')}
                   value={!isCheckboxOrRadio() ? value : ''}
                   onChange={onChange}/>
            {!!error ? <p className='form__error'>{error}</p> : ''}
        </>
    )
}
