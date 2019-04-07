import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Admin.css';
import {Form, Input, Button, Icon, Row, Col } from 'antd';

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
        <h1>List of inactive users</h1>
        </div>
  );

}}

export default withRouter(Admin);
