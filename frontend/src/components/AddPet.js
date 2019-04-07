import React, { Component } from 'react';
import {Upload, Icon, Modal,Form, Input, Cascader, Select, Slider, DatePicker, InputNumber, Row, Col, Checkbox, Button, Card, Rate, Pagination} from 'antd';
import './AddPet.css';
import { withRouter } from "react-router";


const Option = Select.Option;
const { TextArea } = Input;

// const petgender = [
//   { value: 'female', label: 'Female' },
//   { value: 'male', label: 'Male' }
// ];
//
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
  }, {value: 'dachshund',
      label: 'Dachshund'
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
  constructor(props) {
    super(props);
    this.state = {
      petid: 0,
      petname: '',
      petage: '',
      petsize: '',
      petgender: '',
      pettype: '',
      petbreed: '',
      petdesc: '',
      petmed: '',
      previewVisible: false,
      previewImage: '',
      image1: '',
      image2: '',
      image3: '',
      // fileList: [{
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://images.prop24.com/196811060',
      // }]
    }
  }

  // onPetNameChange(petname) {
  //   var petName = event.target.value;
  //   console.log(petName);
  //   this.setState({
  //     petname: petName,
  //   });
  // }


  onPetNameChange(event, petname) {
    console.log(petname);
    this.setState({
      [petname]: event.target.value
    })
  }

  onPetAgeChange(value) {
    console.log(value);
    if(value === "0 - 3 months old"){
        this.setState({
          petage: 1
        })
   } if(value === "4 - 6 months old"){
       this.setState({
         petage: 2

       })
  } if(value === "7 - 12 months old"){
      this.setState({
        petage: 3

      })
 } if(value === "Less than 2 years old"){
     this.setState({
       petage: 4

     })
} if(value ===  "3 years old"){
    this.setState({
      petage: 5

    })
} if(value === "4 years old"){
    this.setState({
      petage: 6

    })
} if(value === "5 years old"){
    this.setState({
      petage: 7

    })
} if(value === "6 years old"){
    this.setState({
      petage: 8

    })
} if(value === "7 years old"){
    this.setState({
      petage: 9
    })
} if(value === "8 years old"){
    this.setState({
      petage: 10

    })
} if(value === "9 years old"){
    this.setState({
      petage: 11

    })
} if(value === "10 years and above"){
    this.setState({
      petage: 12

    })
} else {
  console.log("error the age doesn't fall into any category")
}
 }

  onPetGenderChange(value) {
    console.log(value)
    this.setState({
      petgender: value
    })
  }

  onPetSizeChange(value) {
    if(value === "Small: 0 - 5kg"){
        this.setState({
          petsize: 1
        })
     } if(value === "Medium: 6 - 15kg"){
         this.setState({
           petsize: 2
         })
    } if(value === "Large: 16 - 45kg"){
        this.setState({
          petsize: 3
        })
   } if(value === "Giant: > 45kg"){
       this.setState({
         petsize: 4
       })
     } else {
       console.log("error! does not fall into any weight groups")
  }
  }

  onPetTypeBreedChange(value, selectedOptions) {
    console.log(value);
    console.log(selectedOptions);
    this.setState({
      pettype: value[0],
      petbreed: selectedOptions[1]["label"]
    })
  }

  onPetDescChange(event, petdesc) {
    console.log(petdesc);
    this.setState({
      [petdesc]: event.target.value
    })
  }

  onPetMedChange(event, petmed) {
    console.log(petmed);
    this.setState({
      [petmed]: event.target.value
    })
  }

  // handleCancel = () => this.setState({ previewVisible: false })
  //
  //  handlePreview = (file) => {
  //    this.setState({
  //      previewImage: file.url || file.thumbUrl,
  //      previewVisible: true,
  //    });
  //  }
  //
  //  handleChange = ({ fileList }) => this.setState({ fileList })

   handleSubmit(event) {
     let data = {
       petname: this.state.petname,
       petage: this.state.petage,
       petsize: this.state.petsize,
       petgender: this.state.petgender,
       pettype: this.state.pettype,
       petbreed:this.state.petbreed,
       petdesc: this.state.petdesc,
       petmed: this.state.petmed,
       oid: this.props.id,
       image1: this.state.image1,
       image2: this.state.image2,
       image3: this.state.image3
     }
     console.log(data)
     var request = new Request("http://localhost:3001/addpet", {
       method: 'POST',
       headers: new Headers({'Content-Type': 'application/json'}),
       body: JSON.stringify(data),
       credentials: 'include'
     });

     fetch(request)
     .then((response) => {
       console.log(request)
       response.json()
       .then((data) => {
         console.log(data);
         if (this.props.isCareTaker) {
           this.props.history.push("/add-service");
         } else {
           this.props.history.push("/");
         }
       })
     })
     .catch(function(err) {
       console.log(err);
     })
   }

  fileSelectedHandler1 = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.state.image1 = (e.target.result)
      console.log('the image url' + this.state.image1)
    }
  }

  fileSelectedHandler2 = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.state.image2 = (e.target.result)
      console.log('the image url' + this.state.image2)
    }
  }

  fileSelectedHandler3 = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.state.image3 = (e.target.result)
      console.log('the image url' + this.state.image3)
    }
  }


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
         <Input
            placeholder="Your pet's name"
            petname={this.state.petname}
            onChange={event => this.onPetNameChange(event, 'petname')}
            />
         </Form.Item>
         <Form.Item>
              <Select
                size="large"
                name="role"
                autoComplete="off"
                style={{ width: '100%', fontSize: '14px' }}
                placeholder = "Select your pet's age"
                petage={this.state.petage}
                onChange = {event => this.onPetAgeChange(event)}>
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
                onChange={event => this.onPetGenderChange(event)}>
                {petgender.map(petgender => <Option value={petgender}>{petgender}</Option>)}
              </Select>
            </Form.Item>
         <Form.Item>
        {getFieldDecorator('pettype', {
          rules: [{ type: 'array', required: true, message: 'Please select your pet type and breed' }],
        })(
          <Cascader
          placeholder = "Select your pet type and breed"
          options={petbreed}
          onChange={(value, selectedOptions) => this.onPetTypeBreedChange(value, selectedOptions)} />
        )}
      </Form.Item>
      <Form.Item>
           <Select
             size="large"
             name="role"
             autoComplete="off"
             style={{ width: '100%', fontSize: '14px' }}
             placeholder = "Select your pet size"
             onChange={event => this.onPetSizeChange(event)}>
             {petsize.map(petsize => <Option key={petsize}>{petsize}</Option>)}
           </Select>
         </Form.Item>
         </Col>
         <Col className = "addpet-colright" span={8}>
         <h1> Upload images of your pet </h1>
         {/*<div className="clearfix">
        <Upload
          action="http://localhost:3001/addpet"
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
      </div>*/}
      <div>
        <input className = "pet-imageuploader" type="file" onChange={(e)=>this.fileSelectedHandler1(e)}/>
      </div>
      <div>
        <input className = "pet-imageuploader"type="file" onChange={(e)=>this.fileSelectedHandler2(e)}/>
      </div>
      <div>
        <input className = "pet-imageuploader" type="file" onChange={(e)=>this.fileSelectedHandler3(e)}/>
      </div>
         </Col>
         </Form>
      </Row>
      <div className ="addpet-text">
      <TextArea className = "addpet-textsub" rows={4} placeholder="Description (habits, likes, dislikes)"
          petdesc={this.state.petdesc}
          onChange={event => this.onPetDescChange(event, 'petdesc')}/>
      <TextArea className = "addpet-textsub" rows={4} placeholder="Dietary requirements / Medical conditions"
          petmed={this.state.petmed}
          onChange={event => this.onPetMedChange(event, 'petmed')}/>
      </div>
        <Button className="addpet-button" type="primary" onClick={this.handleSubmit.bind(this)}>
        {this.props.isCareTaker ? "Next" : "Done"}
        </Button>
      </div>
    );
  }
}

class WrappedAddPet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        const WrappedAddPet = Form.create({ name: 'addpet' })(AddPet);
        return (
          <div>
            <WrappedAddPet {...this.props} id= {this.props.id} isCareTaker={this.props.isCareTaker}/>
          </div>
        );
    }
}

export default withRouter(WrappedAddPet);
