import React from 'react'
import Header from './Header'

export default function Auth({title, buttonText, onSubmit, children}) {
  return (
    <>
    <Header />
    <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form" onSubmit={onSubmit}>
            {children}
                <button type="submit" className="auth__submit">{buttonText}</button>         
            </form>
        </div>
    </>
  )
}
