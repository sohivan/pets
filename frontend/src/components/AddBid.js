import React, { Component } from 'react';
import {Input, InputNumber, AutoComplete, Form, Select, DatePicker, Button} from 'antd';
import './AddBid.css';
import { withRouter } from "react-router";
import moment from 'moment';


const Timestamp = require('react-timestamp');
const { TextArea } = Input;
const Option = Select.Option;


const petname = [
  "Furball", "Snow", "Starry", "Leo"
]

const services = [
  "Pet Boarding", "House Sitting", "Dog Walking",  "Drop In Visits",
  "Pet Day Care"
]

function onChange(value) {
  console.log('changed', value);
}



class AddBid extends Component {
  constructor(props) {
    super(props);
    console.log("hello");
    this.state = {
      pets: [],
      result: [],
      bidstartdate: '',
      bidenddate: '',
      bidtimestamp:'',
      bidamt: 30,
      bidpet: 1166,
      bidowner: 255,
      bidsitter: 508,
      bidservice: "Pet Boarding",
      bidreq: '',
      avgbid: "No bids yet",
      startdate: '',
      service: props.searchFilters.service,
      done: false,
    }
  }

  fetchData(getPetsRequest, getAvgBidRequest, getServiceRequest) {
    fetch(getPetsRequest)
        .then((response) =>
          response.json())
          .then((data) => {
            console.log(data);
            console.log(data.length==0);
             let pets = [];
            if(data.length != 0) {
              data.map((obj) => pets.push(obj.name));
            }
            console.log(pets);
            this.setState({
              pets: pets
            })
          })
    fetch(getAvgBidRequest)
    .then((response) =>
      response.json())
      .then((data) => {
        console.log(data)
          this.setState({
            avgbid: data.length != 0 ? "$" + Math.floor(data[0].avgbid): "No bids yet"
          })
      })
      fetch(getServiceRequest)
          .then((response) =>
            response.json())
            .then((data) => {
              var date1 = new Date(data[0].startdate);
              var date = moment(date1).format("YYYY-MM-DD");
              // if (this.state) {
                this.setState({
                  servicestartdate: date
                })
              // }
            })
          .catch(function(err) {
            console.log(err);
          })
    .catch(function(err) {
      console.log(err);
    })
        .catch(function(err) {
          console.log(err);
        })
  }

  // fetchData(getAvgBidRequest) {
  //   fetch(getAvgBidRequest)
  //       .then((response) =>
  //         response.json())
  //         .then((data) => {
  //           console.log(data)
  //             this.setState({
  //               avgbid: data.length != 0 ? data[0].avgbid : "No bids yet"
  //             })
  //         })
  //       .catch(function(err) {
  //         console.log(err);
  //       })
  // }

  componentDidMount () {
    console.log(this.props);
    let dataForAvgBids = {cid: this.props.computedMatch.params.id, service: this.props.searchFilters.service};
    let dataForService = {cid: this.props.computedMatch.params.id, service:"Pet Boarding", startdate: this.props.searchFilters.startdate, enddate: this.props.searchFilters.enddate};

    var getAvgBidRequest = new Request("http://localhost:3001/getAvgBid", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(dataForAvgBids),
      credentials: 'include',
    });
    var getPetsRequest = new Request("http://localhost:3001/getPets", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(dataForAvgBids),
      credentials: 'include',
    });

    var getServiceRequest = new Request("http://localhost:3001/getServiceStartDate", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(dataForService),
      credentials: 'include',
    });

    let pets = [];
    this.fetchData(getPetsRequest, getAvgBidRequest, getServiceRequest);
    // this.fetchData(getAvgBidRequest);

  }



 onPetNameChange(value) {
   console.log("whuut");
   console.log(value);
   this.setState({
     bidpet: value
   })
 }

 onDateChange(date, dateString) {
   console.log(dateString);
   this.setState({
     bidstartdate: dateString[0],
     bidenddate: dateString[1]
   })
   console.log(this.state.bidstartdate)
   console.log(this.state.bidenddate)
 }

 onServiceChange(value) {
   console.log(value)
   this.setState({
     bidservice: value
   })
 }

 onAmtChange(value) {
   console.log(value)
   this.setState({
     bidamt: value
   })
 }

 onSpecialReqChange(event, bidreq) {
   console.log(bidreq);
   this.setState({
     [bidreq]: event.target.value
   })
 }

 onClickPets() {
   console.log("clicked");
 }


 handleSubmit(event) {
  var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  let data = {
     bidstartdate: this.props.searchFilters.startdate,
     bidenddate: this.props.searchFilters.enddate,
     bidtimestamp: [date][0],
     bidamt: this.state.bidamt,
     bidpet: this.state.bidpet,
     bidsitter: this.props.computedMatch.params.id,
     bidservice: this.props.searchFilters.service,
     bidreq: this.state.bidreq,
     servicestartdate: this.state.servicestartdate
   }

    console.log(data)
   var request = new Request("http://localhost:3001/addbid", {
     method: 'POST',
     headers: new Headers({'Content-Type': 'application/json'}),
     body: JSON.stringify(data),
     credentials: 'include'
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


  render() {

    return (
      <div className = "addbid">
          <h1 className = "addbid-title"> Make a Bid </h1>
          {/*
              <h3 className="addbid-label">Pet Owner</h3>
            {/* Needs to be logged into account & take oid from pet owner table
          <Input className="addbid-petowner" placeholder="Pet Owner" />
          */}

          {/* depends on the caretaker */}
          <h3 className="addbid-label">Selected Service</h3>
          <h4> {this.state.service}</h4>
              {/*<Form.Item>
              <Select
                mode="multiple"
                size="large"
                name="role"
                autoComplete="off"
                style={{ width: '100%', fontSize: '14px' }}
                placeholder = "Select your service"
                onChange={event => this.onServiceChange(event)}>
                {services.map(services => <Option key={services}>{services}</Option>)}
              </Select>
              </Form.Item>
              */}
              <h3 className="addbid-label">Average rate that other pet owners are offering:</h3>
              <p>{this.state.avgbid}</p>

          <h3 className="addbid-label">Amount per day</h3>
          <InputNumber
             className="addbid-petowner"
             defaultValue={this.state.bidamt}
             formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             parser={value => value.replace(/\$\s?|(,*)/g, '')}
             onChange={event => this.onAmtChange(event)}/>



        {/* Needs to be logged into account & take oid from pet table */}
        <h3 className="addbid-label">Select Pet</h3>
            <Form.Item>
            <Select
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%', fontSize: '14px' }}
              placeholder = "Select your pet"
              onChange={this.onPetNameChange.bind(this)}>
              {this.state.pets.map((petname) => <Option key={petname}>{petname}</Option>)}
            </Select>
            </Form.Item>

        <h3 className="addbid-label">Selected Dates</h3>
        <h4> {this.props.searchFilters.startdate} - {this.props.searchFilters.enddate}</h4>

            {/*<Form.Item className="date-picker">
               <DatePicker.RangePicker
                  className="addbid-petowner"
                  style={{ fontSize: '14px' }}
                  onChange={this.onDateChange.bind(this)}
                  placeholder={['Drop off', 'Pick up']}/>
            </Form.Item>*/}


        <h3 className="addbid-label">Special Requests</h3>
         <TextArea className = "addbid-petowne" rows={4} placeholder="Special Requests"
         bidreq={this.state.bidreq}
         onChange={event => this.onSpecialReqChange(event, 'bidreq')}/>
         <Button className="addbid-button" type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
      </div>
    );
  }
}

export default withRouter(AddBid);
