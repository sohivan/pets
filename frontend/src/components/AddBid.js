import React, { Component } from 'react';
import {Input, InputNumber, AutoComplete, Form, Select, DatePicker, Button} from 'antd';
import './AddBid.css';

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
  constructor() {
    super();
    this.state = {
      result: [],
      bidstartdate: '',
      bidenddate: '',
      bidtimestamp:'',
      bidamt: 30,
      bidpet: 1166,
      bidowner: 255,
      bidsitter: 508,
      bidservice: 1,
      bidreq: '',
    }
  }

 onPetNameChange(value) {
   console.log(value);
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


 handleSubmit(event) {
  var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  let data = {
     bidstartdate: this.state.bidstartdate,
     bidenddate: this.state.bidenddate,
     bidtimestamp: [date][0],
     bidamt: this.state.bidamt,
     bidpet: this.state.bidpet,
     bidowner:this.state.bidowner,
     bidsitter: this.state.bidsitter,
     bidservice: 1,
     bidreq: this.state.bidreq
   }
    console.log(data)
   var request = new Request("http://localhost:3001/addbid", {
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
 }


  render() {
    return (
      <div className = "addbid">
          <h1 className = "addbid-title"> Make a Bid </h1>
          <h3 className="addbid-label">Pet Owner</h3>
          {/* Needs to be logged into account & take oid from pet owner table */}
          <Input className="addbid-petowner" placeholder="Pet Owner" />

          {/* depends on the caretaker */}
          <h3 className="addbid-label">Selected Service</h3>
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

              <h3 className="addbid-label">Average rate that other pet owners are offering:</h3>
              <h3>$24</h3>*/}

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
              mode="multiple"
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%', fontSize: '14px' }}
              placeholder = "Select your pet"
              onChange={this.onPetNameChange.bind(this)}>
              {petname.map(petname => <Option key={petname}>{petname}</Option>)}
            </Select>
            </Form.Item>

        <h3 className="addbid-label">Selected Dates</h3>
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

export default AddBid;
