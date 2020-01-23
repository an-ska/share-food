import React from 'react'
import './Button.css'

const Button = ({
    type = 'button',
    handleClick,
    children
}) => (
    <button
        type={type}
        onClick={handleClick}
    >
        { children }
    </button>
)

export default Button