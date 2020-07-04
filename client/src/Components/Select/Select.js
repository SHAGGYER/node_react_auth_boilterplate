import React from "react";

export default function ({label, value, onChange, error, disabled, children}) {
    return (
        <>
            <label className={'form__label ' + (!!error ? 'form__label--error' : '')}>{label}</label>
            <select className={('form__input ') + (!!error ? 'form__input--has-error' : '')}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}>
                {children}
            </select>
            {!!error ? <p className='form__error'>{error}</p> : ''}
        </>
    )
}