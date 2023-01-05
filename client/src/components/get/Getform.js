import React from 'react';

const  a= { name: 'John', email: 'john@example.com' };



class MyForm extends React.Component {
  state = {
    name: '',
    email: '',
    number:'',
    data: []
  };
  

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
     // Get a reference to the form element
     //const formElement = document.querySelector('form');
     const formElement = document.getElementById('toget');

     //const fdata = { name: this.state.name, email: this.state.email };

     const name = this.state.name;
    const email = this.state.email;
    const number = this.state.number;

    // Create an object with the form data
    const fdata = [ name, email,number ];
     // send the form data to the backend
     //const fdata = new FormData(formElement);

   console.log(fdata)
 
 
    fetch('http://localhost:5000',{
      method: 'POST',
      body: JSON.stringify(fdata),
      headers: { 'Content-Type': 'application/json' }
      
    })
    .then(response => response.text())
    .then(data => console.log(data));
  }

  render() {

    return (
      <div>
        <form id="toget" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Number:
            <input type="number" name="number" value={this.state.number} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        {/* render the data returned from the backend */}
        {this.state.data.map((item) => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default MyForm;
