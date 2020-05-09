import React from "react";

export default function ({label, checked, onChange, error}) {
    return (
        <>
            <label className={'form__label ' + (!!error ? 'form__label--error' : '')}>
                <span className='mr-1'>
                    {label}
                </span>
                <input type='checkbox'
                       checked={checked}
                       onChange={onChange}/>
            </label>
            {!!error ? <p className='form__error'>{error}</p> : ''}
        </>
    )
}
