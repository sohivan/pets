import React, { Component } from 'react';
import {Input, InputNumber, AutoComplete, Form, Select, DatePicker, Button} from 'antd';
import './AddBid.css';

const { TextArea } = Input;
const Option = Select.Option;


const petname = [
  "Furball", "Snow", "Starry", "Leo"
]

function onChange(value) {
  console.log('changed', value);
}


class AddBid extends Component {
  state = {
    result: [],
  }

 onPetNameChange(value) {
   console.log(value);
 }

 onDateChange(date, dateString) {
   console.log(date);
   console.log(dateString);
 }

  render() {
    return (
      <div className = "addbid">
          <h1 className = "addbid-title"> Make a Bid </h1>
          <h3 className="addbid-label">Pet Owner</h3>

          <Input className="addbid-petowner" placeholder="Pet Owner" />
          <h3 className="addbid-label">Amount per day</h3>
          <InputNumber
             className="addbid-petowner"
             defaultValue={20}
             formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             parser={value => value.replace(/\$\s?|(,*)/g, '')}
             onChange={onChange}/>

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
        <h3 className="addbid-label">Select Dates</h3>
            <Form.Item className="date-picker">
               <DatePicker.RangePicker
                  className="addbid-petowner"
                  style={{ fontSize: '14px' }}
                  onChange={this.onDateChange.bind(this)}
                  placeholder={['Drop off', 'Pick up']}/>
            </Form.Item>
        <h3 className="addbid-label">Special Requests</h3>
         <TextArea className = "addbid-petowne" rows={4} placeholder="Special Requests"/>
         <Button className="addbid-button" type="primary">Submit</Button>
      </div>
    );
  }
}

export default AddBid;
