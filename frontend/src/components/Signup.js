import React, { Component } from 'react';
import {Form, Input, Select, Button} from 'antd';
import './Signup.css';


const Option = Select.Option;

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (id) => {
    this.props.onGoToAddPet(id);
  }

  render() {
        const AntWrappedLoginForm = Form.create()(SignupForm)
        return (
          <div>
            <AntWrappedLoginForm onGoToAddPet= {this.onSubmit.bind(this)}/>
          </div>
        );
    }
}

const roles = ["Pet Owner", "Caretaker"]

class SignupForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: ['Pet Owner'],
    }
  }

  onUsernameChange = (event) => {
    this.props.form.setFieldsValue({
     username: event.target.value
   });
  }

  onEmailChange = (event) => {
    this.props.form.setFieldsValue({
     email: event.target.value
   });
  }

  onPasswordChange = (event) =>  {
    this.props.form.setFieldsValue({
     password: event.target.value
   });
  }

  onRoleChange(value, options) {
    this.props.form.setFieldsValue({
     role: value
   });
  }

  goToAddPet = (event) => {
    console.log("goToAddPet");
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    let data = this.props.form.getFieldsValue();
    var request = new Request("http://localhost:3001/signup", {
       method: 'POST',
       headers: new Headers({'Content-Type': 'application/json'}),
       body: JSON.stringify(data)
     });

     fetch(request)
     .then((response) =>
       response.json())
       .then((data) => {
         console.log(data)
         this.props.onGoToAddPet(data.id);
       })
     .catch(function(err) {
       console.log(err);
     })
  }

  handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    let data = this.props.form.getFieldsValue();
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


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
      <h1 className = "signup-title"> Sign Up </h1>
      <Form>
        <div className="signup-div">
        <Form.Item>
        {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input
              placeholder="Email*"
              onChange={this.onEmailChange.bind(this)}/>
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your username!',
            }],
          })(
            <Input
              placeholder="Username*"
              onChange={this.onUsernameChange.bind(this)}/>
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }],
          })(
            <Input
              placeholder="Password*"
              onChange={this.onPasswordChange.bind(this)}/>
          )}
        </Form.Item>
        <div>
        <p className="service-label">Sign up as a:</p>
        </div>
        <Form.Item>
        {getFieldDecorator('role', {
            initialValue: ["Pet Owner"],
            rules: [{
              required: true, type: 'array', message: 'Please choose at least one role!',
            }],
          })(
            <Select
              mode="multiple"
              size="large"
              autoComplete="off"
              style={{ width: '100%', fontSize: '14px' }}
              onChange={this.onRoleChange.bind(this)}
              >
              {roles.map(role => <Option key={role}>{role}</Option>)}
            </Select>
          )}
        </Form.Item>
        {this.props.form.getFieldValue('role').includes("Pet Owner") ?
        <Button className= "search-button" type="primary" htmlType="submit" onClick={this.goToAddPet.bind(this)}>
            Next
        </Button>
        :
        <Button className= "search-button" type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
            Submit
        </Button>
        }

        </div>
        </Form>

    </div>

    );
  }
}

export default Signup;
