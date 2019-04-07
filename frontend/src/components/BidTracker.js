import React, { Component } from 'react';
import { Table, Divider, Tag, Input, Button, Popconfirm, Form } from 'antd';
import './BidTracker.css';
import { withRouter } from "react-router";


const { Column, ColumnGroup } = Table;

const FormItem = Form.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class BidTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingbid: [],
      pendingbid: [],
      pastbid: [],
      deletebid: 0,
      acceptbid: 0,
      editing: false,
    }
  };

  // Gets data from the table when the page first launches
  componentWillMount () {
      var upcomingbidrequest = new Request("http://localhost:3001/getUpcomingBids", {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
      });
      var pendingbidrequest = new Request("http://localhost:3001/getPendingBids", {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
      });
      var pastbidrequest = new Request("http://localhost:3001/getPastBids", {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
      });
          fetch(pendingbidrequest)
              .then((response) =>
                response.json())
                .then((pendingbiddata) => {
                  this.setState({
                    pendingbid: pendingbiddata
                  })
                  console.log(this.state.pendingbid)
                })
              .catch(function(err) {
                console.log(err);
              })

          fetch(upcomingbidrequest)
              .then((response) =>
                response.json())
                .then((upcomingbiddata) => {
                  this.setState({
                    upcomingbid: upcomingbiddata
                  })
                })
              .catch(function(err) {
                console.log(err);
              })

          fetch(pastbidrequest)
              .then((response) =>
                response.json())
                .then((pastbiddata) => {
                  this.setState({
                    pastbid: pastbiddata,
                  })
                })
              .catch(function(err) {
                console.log(err);
              })
  }

  // TO BE DONE: when rejected button is clicked
  handleDelete = (key) => {
    this.setState({
      deletebid: key
    })
    console.log(key);
    console.log(this.state.deletebid);
    this.nextDelete();
  }

  nextDelete = () => {
    let data = {
      deletebid: this.state.deletebid,
    }
    var request = new Request("http://localhost:3001/deleteBid", {
      method: 'DELETE',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
    .then(function(response) {
      console.log(request)
      response.json()
      .then(function(data) {
        console.log(data)
      })
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  // TO BE DONE: when accepted button is clicked. SetState changes to the BidID after second click idk WHYYY
  handleAccept = (key) => {
    this.state.acceptbid = key
    this.nextAccept();

  }

  nextAccept = () => {
    let data = {
      acceptbid: this.state.acceptbid,
    }
    console.log(data)
    var request = new Request("http://localhost:3001/acceptBid", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
    .then(function(response) {
      console.log(request)
      response.json()
      .then(function(data) {
        console.log(data)
      })
    })
    .catch(function(err) {
      console.log(err);
    })
    this.updateBidTable();
  }

  // TO BE DONE: front end needs to reflect the updated data. it now only do this after 2 clicks....
  updateBidTable = () => {
    var upcomingbidrequest = new Request("http://localhost:3001/getUpcomingBids", {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    var pendingbidrequest = new Request("http://localhost:3001/getPendingBids", {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    var pastbidrequest = new Request("http://localhost:3001/getPastBids", {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'})
    });
        fetch(pendingbidrequest)
            .then((response) =>
              response.json())
              .then((pendingbiddata) => {
                this.setState({
                  pendingbid: pendingbiddata
                })
                console.log(this.state.pendingbid)
              })
            .catch(function(err) {
              console.log(err);
            })

        fetch(upcomingbidrequest)
            .then((response) =>
              response.json())
              .then((upcomingbiddata) => {
                this.setState({
                  upcomingbid: upcomingbiddata
                })
              })
            .catch(function(err) {
              console.log(err);
            })

        fetch(pastbidrequest)
            .then((response) =>
              response.json())
              .then((pastbiddata) => {
                this.setState({
                  pastbid: pastbiddata,
                })
              })
            .catch(function(err) {
              console.log(err);
            })
  }

  render() {

    return (
      <div className="bidtracker">
      <h1 className = "bidtracker-title">Your Bids</h1>
      <h2 className = "bidtracker-subtitle">Upcoming</h2>
      <Table dataSource={this.state.upcomingbid}>
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
      dataIndex="bidstartdate"
      key="bidstartdate"
      />
      <Column
      title="End Date"
      dataIndex="bidenddate"
      key="bidenddate"
      />
    {/*<Column
      title="Address"
      dataIndex="address"
      key="address"
    />*/}

    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.bidid)}>
          <a href="javascript:;">Reject</a>
        </Popconfirm>
        <Divider type="vertical" />
          <a href={"mailto:" + "hello123@gmail.com"}>Email</a>
        </span>

      )}
    />
  </Table>
      <h2 className = "bidtracker-subtitle">Pending</h2>
      <Table dataSource={this.state.pendingbid}>
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
      dataIndex="bidstartdate"
      key="bidstartdate"
    />
    <Column
      title="End Date"
      dataIndex="bidenddate"
      key="bidenddate"
    />

    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.handleAccept(record.bidid)}>Accept</a>
          <Divider type="vertical" />
          <a href="javascript:;">Reject</a>
          <Divider type="vertical" />
          <a href={"mailto:" + "hello123@gmail.com"}>Email</a>
        </span>
      )}
    />
  </Table>
      <h2 className = "bidtracker-subtitle">Past</h2>
      <Table dataSource={this.state.pastbid}>
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
  }
}

export default withRouter(BidTracker);
