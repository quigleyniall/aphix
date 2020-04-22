import React from 'react';
import Layout from './components/layout';
import FormWrapper from './components/form/formWrapper';
import TextInput from './components/form/textInput';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      unit: '',
      quantity: '',
      vatRate: '',
      vat: 0,
      net: 0,
      gross: 0,
      error: {},
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { error, unit, quantity, vatRate } = this.state;
    let valid = true;

    for (let key in error) {
      if (error[key].length > 0) {
        valid = false;
      }
    }

    if (unit.length === 0 || quantity.length === 0 || vatRate.length === 0) {
      valid = false;
    }

    if (valid) {
      this.makeCalculation();
    }
  }

  round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
 }

  makeCalculation = () => {
    const { unit, quantity, vatRate } = this.state;
    
    const net = (this.round(+(unit * quantity), 2)).toFixed(2);
    const vat = (this.round(net * (vatRate / 100), 2)).toFixed(2);
    const gross = (this.round((+net + +vat), 2)).toFixed(2);

    this.setState({
      net: net.toString().concat(' $'),
      vat: vat.toString().concat(' $'),
      gross: gross.toString().concat(' $')
    });
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    const error = this.validate(name, value);    
    
    this.setState(prevState => ({
      [name]: value,
      error: {
            ...prevState.error,
            [name]: error
          }
    }));    
  }

  validate = (name, value) => {
    const decimalCheck5 = /^[0-9]+(\.[0-9]{1,5})?$/;
    const decimalCheck2 = /^[0-9]+(\.[0-9]{1,2})?$/;
    const numberCheck = /^[0-9]+(\.)?$/;
    
    switch (name) {
      case 'unit':
        if (value.length === 0) {
          return 'A number is required!';
        }

        if (!decimalCheck5.test(value) && !numberCheck.test(value)) {
            return 'Only Numbers up to 5 decimal places allowed!';
        }
       
        return '';

      case 'quantity':
        if (value.length === 0) {
          return 'A number is required!';
        }

        if (!numberCheck.test(value)) {
          return 'Quantity has to be an Integer!';
        }

        return '';
      
      case 'vatRate':
        if (value.length === 0) {
          return 'A Percentage is required!';
        }

        if (!decimalCheck2.test(value) && !numberCheck.test(value)) {   
            return 'Only Percentages up to 2 decimal places are allowed';
        }

        return '';
      
      default:
        return '';      
    }
  }

  render() {
    const { vat, gross, net, error } = this.state;
    return (
      <Layout>
        <main className="main-content">
          <h1 className="heading-primary">Calculate your net price using the calculator below!</h1>
          <div className="calculation-content">
            <FormWrapper submitForm={this.submit}>
              <h3 className="heading-secondary">Make Your Calculation here!</h3>
              <TextInput name="unit" change={this.handleChange} placeholder="Unit Price" label="Unit Price" error={error} />
              <TextInput name="quantity" change={this.handleChange} placeholder="Quantity" label="Quantity" error={error} />
              <TextInput name="vatRate" change={this.handleChange} placeholder="Vat Rate %" label="Vat (%)" error={error} />
            </FormWrapper>
            <div className="results">
              <h3 className="heading-secondary">Your Results</h3>
              <div className="results__group">
                <div className="results__name">VAT Amount</div>
                <div className="results__value">{vat}</div>
              </div>
              <div className="results__group">
                <div className="results__name">Gross</div>
                <div className="results__value">{gross}</div>
              </div>
              <div className="results__group">
                <div className="results__name">Net</div>
                <div className="results__value">{net}</div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
}

export default App;
