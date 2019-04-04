import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PetProfile.css';
import {Form, Input, Button, Icon, Row, Col } from 'antd';

class PetProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
        <Button className="pet-profile-button" type="primary">
            <Icon type="left" />Back to owner's profile</Button>
        <Row>
        <Col span={12}>
        <div className = "pet-profile-pic">
        <img className = "pet-profile-img" src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="pet image1"/>
        <img className = "pet-profile-img" src="https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="pet image2"/>
        <img className = "pet-profile-img" src="https://i5.wal.co/dfw/4ff9c6c9-a77b/k2-_864ef38f-4c7e-427e-8a3c-7415272c6919.v1.jpg" alt="pet image3"/>
        </div>
        </Col>

        <Col span={12}>
          <div className="pet-profile">
          <h1 className="pet-profile-subtitle">Pet Name:</h1>
          <h1 className="pet-profile-subtitle">Type:</h1>
          <h1 className="pet-profile-subtitle">Breed:</h1>
          <h1 className="pet-profile-subtitle">Size:</h1>
          <h1 className="pet-profile-subtitle">Gender:</h1>
          <h1 className="pet-profile-subtitle">Age:</h1>
          <h1 className="pet-profile-subtitle">Description:</h1>
          <h1 className="pet-profile-subtitle">Medical Condition/Dietary Requests: </h1>
          </div>
        </Col>
        </Row>
        </div>
  );

}}

export default withRouter(PetProfile);
