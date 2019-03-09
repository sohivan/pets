import React, { Component } from 'react';
import {Form, Select, Slider, DatePicker} from 'antd';
import Script from 'react-load-script';
import Autocomplete from 'react-google-autocomplete';


import './SearchForm.css';


const Option = Select.Option;
const services = [
  "Dog Boarding", "Dog Sitting", "Dog Pooping"
]



class SearchForm extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(Search)
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm />
                </div>
            </div>
        );
    }
}


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
     marks: {
        0: '$10',
        100: '$150'
      },
      city: '',
      query: ''
    }
  }



  onSelect(value) {
    console.log('onSelect', value);
  }


  handleSubmit = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    onChange(value) {
      let newVal = "$"+value;
      this.setState({
        marks: {
          0: '$10',
          100: newVal
          }
        })
    }

  onDateChange(date, dateString) {
    console.log(date);
    console.log(dateString);
  }

  onServiceChange(value) {
    console.log(value);
  }

  handleScriptLoad() {

  // Initialize Google Autocomplete
  /*global google*/
  this.autocomplete = new google.maps.places.Autocomplete(
                        document.getElementById('autocomplete'),
                        this.state.dataSource);
  // Fire Event when a suggested name is selected
  this.autocomplete.addListener('place_changed',
                                this.handlePlaceSelect);
}

handlePlaceSelect() {
   // Extract City From Address Object
   let addressObject = this.autocomplete.getPlace();
   let address = addressObject.address_components;

   // Check if address is valid
   if (address) {
     // Set State
     this.setState(
       {
         dataSource: address[0].long_name,
         query: addressObject.formatted_address,
       }
     );
   }
 }
  render() {


    return (
      <div>
        <h3> Find A Sitter </h3>
        <Form>
          <div>
          <p className="service-label">Service</p>
          </div>
          <Form.Item>
            <Select
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%' }}
              defaultValue={['Dog Boarding']}
              onChange={this.onServiceChange.bind(this)}>
              {services.map(service => <Option key={service}>{service}</Option>)}
            </Select>
          </Form.Item>
          <div className="slider-label">
            <p>Rate</p>
          </div>
          <Form.Item>
            <Slider
              marks={this.state.marks}
              defaultValue={150}
              tipFormatter={(value) => `$${value}`}
              onChange={this.onChange.bind(this)}/>
          </Form.Item>
          <div className="dates-label">
            <p>Service</p>
          </div>
          <Form.Item className="date-picker">
             <DatePicker.RangePicker
                onChange={this.onDateChange.bind(this)}
                placeholder={['Drop off', 'Pick up']}/>
          </Form.Item>
          </Form>
      </div>


    );
  }
}


export default SearchForm;
