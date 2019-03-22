import React, { Component } from 'react';
import {Upload, Icon, Modal,Form, Input, Cascader, Select, Slider, DatePicker, InputNumber, Row, Col, Checkbox, Button, Card, Rate, Pagination} from 'antd';
import './AddPet.css';


const Option = Select.Option;
const { TextArea } = Input;

const petgender = [
  "Male", "Female"
]

const petage = [
  "0 - 3 months old", "4 - 6 months old", "7 - 12 months old",
  "Less than 2 years old", "3 years old", "4 years old", "5 years old",
  "6 years old", "7 years old", "8 years old", "9 years old", "10 years and above"
]

const petsize = [
  "Small: 0 - 5kg", "Medium: 6 - 15kg", "Large: 16 - 45kg", "Giant: > 45kg"
]
const pettype = [
  "Dog", "Cat", "Hamster", "Rabbit"
]


const petbreed = [{
  value: 'dog',
  label: 'Dog',
  children: [{
    value: 'goldenretriever',
    label: 'Golden Retriever',
  }, {value: 'shihtzu',
      label: 'Shih Tzu'
  }, {value: 'chiwawa',
      label: 'Chiwawa'
  }, {value: 'maltese',
      label: 'Maltese'
  },{value: 'pug',
      label: 'Pug'
  }, {value: 'poodle',
      label: 'Poodle'
  }, {value: 'beagle',
      label: 'Beagle'
  }, {value: 'dashschund',
      label: 'Dashschund'
  }, {value: 'bordercollie',
      label: 'Border Collie'
  }],
}, {
  value: 'cat',
  label: 'Cat',
  children: [{
    value: 'siamese',
    label: 'Siamese',
  }, {
    value: 'persian',
    label: 'Persian',
  }, {
    value: 'munchkin',
    label: 'Munchkin',
  }, {
    value: 'britishshorthair',
    label: 'British Shorthair',
  }, {
    value: 'himalayan',
    label: 'Himalayan',
  }, {
    value: 'savannah',
    label: 'Savannah',
  }],
}, {
  value: 'hamster',
  label: 'Hamster',
  children: [{
    value: 'winterwhitedwarf',
    label: 'Winter White Dwarf',
  }, {
    value: 'chinese',
    label: 'Chinese',
  }, {
    value: 'robo',
    label: 'Robo',
  }, {
    value: 'campbelldwarf',
    label: 'Campbell Dwarf',
  }],
}, {
  value: 'rabbit',
  label: 'Rabbit',
  children: [{
    value: 'lionhead',
    label: 'Lion Head',
  }, {
    value: 'flemishgiant',
    label: 'Flemish Giant',
  }, {
    value: 'hollandlop',
    label: 'Holland Lop',
  }, {
    value: 'dutch',
    label: 'Dutch',
  }, {
    value: 'englishlop',
    label: 'EnglishLop',
  }],
}];



class AddPet extends Component {

  state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://images.prop24.com/196811060',
      }],
    };

  onPetAgeChange(value) {
    console.log(value);
  }
  onPetGenderChange(value) {
    console.log(value);
  }
  onPetSizeChange(value) {
    console.log(value);
  }
  onPetTypeChange(value) {
    console.log(value);
  }

  handleCancel = () => this.setState({ previewVisible: false })

   handlePreview = (file) => {
     this.setState({
       previewImage: file.url || file.thumbUrl,
       previewVisible: true,
     });
   }

   handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload Pet Image</div>
      </div>
    );
    return (
      <div>
      <Row gutter={16}>
      <h1 className = "addpet-title"> Add your Pet </h1>
      <Form>
         <Col span={8} className = "addpet-col">
         <Form.Item>
         <Input placeholder="Your pet's name" />
         </Form.Item>
         <Form.Item>
              <Select
                size="large"
                name="role"
                autoComplete="off"
                style={{ width: '100%', fontSize: '14px' }}
                placeholder = "Select your pet's age"
                onChange={this.onPetAgeChange.bind(this)}>
                {petage.map(petage => <Option key={petage}>{petage}</Option>)}
              </Select>
            </Form.Item>
         <Form.Item>
              <Select
                size="large"
                name="role"
                autoComplete="off"
                style={{ width: '100%', fontSize: '14px' }}
                placeholder = "Select your pet's gender"
                onChange={this.onPetGenderChange.bind(this)}>
                {petgender.map(petgender => <Option key={petgender}>{petgender}</Option>)}
              </Select>
            </Form.Item>
         <Form.Item>
        {getFieldDecorator('pettype', {
          rules: [{ type: 'array', required: true, message: 'Please select your pet type and breed' }],
        })(
          <Cascader
          placeholder = "Select your pet type and breed"
          options={petbreed} />
        )}
      </Form.Item>
      <Form.Item>
           <Select
             size="large"
             name="role"
             autoComplete="off"
             style={{ width: '100%', fontSize: '14px' }}
             placeholder = "Select your pet size"
             onChange={this.onPetSizeChange.bind(this)}>
             {petsize.map(petsize => <Option key={petsize}>{petsize}</Option>)}
           </Select>
         </Form.Item>
         </Col>
         <Col className = "addpet-colright" span={8}>
         <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
         </Col>
         <div className ="addpet-text">
         <TextArea className = "addpet-textsub" rows={4} placeholder="Description (habits, likes, dislikes)"/>
         <TextArea className = "addpet-textsub" rows={4} placeholder="Dietary requirements / Medical conditions"/>
         </div>
         </Form>
      </Row>
      <Button className="addpet-button" type="primary">Submit</Button>
      </div>
    );
  }
}

const WrappedAddPet = Form.create({ name: 'addpet' })(AddPet);

export default WrappedAddPet;
