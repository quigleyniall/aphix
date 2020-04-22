import React from 'react';

const FormWrapper = ({ children, submitForm, grid }) => (
  <form onSubmit={submitForm} className={grid ? `form ${grid}` : 'form'}>
    {children}
    <button type="submit" className="form__btn">Calculate</button>
  </form>
);

export default FormWrapper;