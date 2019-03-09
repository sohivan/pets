import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSubmit(event) {
    console.log("heyho");
    if (this.state.name!=="" && this.state.email!=="" && this.state.password!=="") {
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
    var request = new Request("http://localhost:3001/signup", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
    .then(function(response) {
      response.json()
      .then(function(data) {
        console.log(data)
      })
    })
    .catch(function(err) {
      console.log(err);
    })
  }
  }

  handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
  };

  handleChange = email => event => {
      this.setState({
        [email]: event.target.value,
      });
    };

  handleChange = password => event => {
      this.setState({
        [password]: event.target.value,
      });
    };

  // validateEmail() {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  render() {
    return (
      <div>
      <TextField
         id="outlined-name"
         label="Name"
         onChange={this.handleChange('name')}
         margin="normal"
         variant="outlined"
       />
       <br/>
       <TextField
          id="outlined-name"
          label="Email"
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <TextField
           id="outlined-name"
           label="Password"
           onChange={this.handleChange('password')}
           margin="normal"
           variant="outlined"
         />
         <br/>
         <Button color="primary" variant="contained" onClick={this.handleSubmit.bind(this)}>Submit </Button>
         </div>
    );
  }
}

export default Signup;
