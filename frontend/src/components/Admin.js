import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Admin.css';
import { Table, Divider, Tag, Input, Button, Popconfirm, Form } from 'antd';

const { Column, ColumnGroup } = Table;


class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
        <h1 className="admin-title">List of inactive bids</h1>
        <Table >
        <Column
          title="Bid Date"
          dataIndex="bidtimestamp"
          key="bidtimestamp"
        />
        <Column
          title="Pet Owner"
          dataIndex="owner_name"
          key="owner_name"
        />
        <Column
          title="Pet Name"
          dataIndex="name"
          key="name"
        />
        <Column
        title="Type"
        dataIndex="typeofpet"
        key="typeofpet"
        />
        <Column
        title="Service"
        dataIndex="service"
        key="service"
        />
        <Column
        title="Start Date"
        dataIndex="bidstartdate"
        key="bidstartdate"
        />
        <Column
        title="End Date"
        dataIndex="bidenddate"
        key="bidenddate"
        />
        </Table>
        </div>
  );

}}

export default withRouter(Admin);
