import React from 'react'

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false
 }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="ui input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input