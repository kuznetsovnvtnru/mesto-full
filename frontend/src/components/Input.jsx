import React, { forwardRef } from 'react'
const Input = forwardRef(function ({ type, placeholder, name, id, className, children, onChange, value}, ref ){

    return (
        <>
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                className={`form__field form__field_${className}`}
                src={children}
                onChange={onChange}
                value={value}
                required />
            <span id={`${id}-error`} className="form__error"></span>
        </>
    )
});
export default Input;