import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class Login extends Component {
  handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

  render() {
    return (
      <TextField
         id="outlined-name"
         label="Name"
         onChange={this.handleChange('name')}
         margin="normal"
         variant="outlined"
       />
    );
  }
}

export default Login;
