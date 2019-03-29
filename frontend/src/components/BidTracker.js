import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import './BidTracker.css';
import { withRouter } from "react-router";


const { Column, ColumnGroup } = Table;

const upcomingbid = [{
  key: '1',
  name: 'John',
  pet: 'Snow',
  type: 'Dog',
  breed: 'Maltese',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim',
  pet: 'Ching',
  type: 'Dog',
  breed: 'Shih Tzu',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe',
  pet: 'Blackie',
  type: 'Cat',
  breed: 'Siamese',
  service: 'Sitting',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'Sidney No. 1 Lake Park',
}];


const pendingbid = [{
  key: '1',
  name: 'John',
  pet: 'Snow',
  type: 'Dog',
  breed: 'Maltese',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim',
  pet: 'Ching',
  type: 'Dog',
  breed: 'Shih Tzu',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe',
  pet: 'Blackie',
  type: 'Cat',
  breed: 'Siamese',
  service: 'Sitting',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'Sidney No. 1 Lake Park',
}];

const pastbid = [{
  key: '1',
  name: 'John',
  pet: 'Snow',
  type: 'Dog',
  breed: 'Maltese',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim',
  pet: 'Ching',
  type: 'Dog',
  breed: 'Shih Tzu',
  service: 'Walking',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe',
  pet: 'Blackie',
  type: 'Cat',
  breed: 'Siamese',
  service: 'Sitting',
  startdate: '2019-4-1',
  enddate: '2019-4-1',
  biddate: '2019-3-29',
  address: 'Sidney No. 1 Lake Park',
}];


class BidTracker extends Component {
  render() {
    return (
      <div className="bidtracker">
      <h1 className = "bidtracker-title">Your Bids</h1>
      <h2 className = "bidtracker-subtitle">Upcoming</h2>
      <Table dataSource={upcomingbid}>
      <Column
        title="Bid Date"
        dataIndex="biddate"
        key="biddate"
      />
      <Column
        title="Pet Owner"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Pet Name"
        dataIndex="pet"
        key="pet"
      />
    <Column
      title="Type"
      dataIndex="type"
      key="type"
    />
    <Column
      title="Breed"
      dataIndex="breed"
      key="breed"
    />
    <Column
      title="Service"
      dataIndex="service"
      key="service"
    />
    <Column
      title="Start Date"
      dataIndex="startdate"
      key="startdate"
    />
    <Column
      title="End Date"
      dataIndex="enddate"
      key="enddate"
    />
    <Column
      title="Address"
      dataIndex="address"
      key="address"
    />

    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;">Email {record.lastName}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Reject</a>
        </span>
      )}
    />
  </Table>
      <h2 className = "bidtracker-subtitle">Pending</h2>
      <Table dataSource={pendingbid}>
      <Column
        title="Bid Date"
        dataIndex="biddate"
        key="biddate"
      />
      <Column
        title="Pet Owner"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Pet Name"
        dataIndex="pet"
        key="pet"
      />
    <Column
      title="Type"
      dataIndex="type"
      key="type"
    />
    <Column
      title="Breed"
      dataIndex="breed"
      key="breed"
    />
    <Column
      title="Service"
      dataIndex="service"
      key="service"
    />
    <Column
      title="Start Date"
      dataIndex="startdate"
      key="startdate"
    />
    <Column
      title="End Date"
      dataIndex="enddate"
      key="enddate"
    />
    <Column
      title="Address"
      dataIndex="address"
      key="address"
    />

    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;">Accept {record.lastName}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Reject</a>
          <Divider type="vertical" />
          <a href="javascript:;">Email</a>
        </span>
      )}
    />
  </Table>
      <h2 className = "bidtracker-subtitle">Past</h2>
      <Table dataSource={pastbid}>
      <Column
        title="Bid Date"
        dataIndex="biddate"
        key="biddate"
      />
      <Column
        title="Pet Owner"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Pet Name"
        dataIndex="pet"
        key="pet"
      />
    <Column
      title="Type"
      dataIndex="type"
      key="type"
    />
    <Column
      title="Breed"
      dataIndex="breed"
      key="breed"
    />
    <Column
      title="Service"
      dataIndex="service"
      key="service"
    />
    <Column
      title="Start Date"
      dataIndex="startdate"
      key="startdate"
    />
    <Column
      title="End Date"
      dataIndex="enddate"
      key="enddate"
    />
    <Column
      title="Address"
      dataIndex="address"
      key="address"
    />
  </Table>
    </div>

    );
  }
}

export default withRouter(BidTracker);
