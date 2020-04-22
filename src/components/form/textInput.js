import React from 'react';

const TextInput = ({ label, name, change, error, placeholder }) => (
  <div className="form__group">
    <label htmlFor={name} className="form__label">{label}</label>
    <input 
      name={name} 
      onChange={change} 
      type="text" 
      className={
        error[name] && error[name].length > 0 ? (
          "form__input form__input--error"
        ) : (
          "form__input"
        )        
      }
      placeholder={placeholder} />
    {error[name] && error[name].length > 0 && <span className="form__error">{error[name]}</span>}
  </div>
);

export default TextInput;