import React, { Component } from 'react';
import { Table, Divider, Tag, Input, Button, Popconfirm, Form, Rate, Icon } from 'antd';
import './BidTracker.css';
import { withRouter } from "react-router";

class Rating extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <div className="rating">
    <Button href="/bid-tracker" className="bid-tracker-button" type="primary">
        <Icon type="left" />Back to bids</Button>
    <h1 className = "rate-title">Rate the Service</h1>
    <h2 className = "rate-subtitle">How was the overall experience?</h2>
    <div className = "rate">
    <Rate />
    </div>
    <Button className="rate-button" type="primary"> Submit
    </Button>
    </div>
  );
}}

export default withRouter(Rating);
