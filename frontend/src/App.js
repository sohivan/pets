import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchForm from './components/SearchForm';
import AddPet from './components/AddPet';
import AddBid from './components/AddBid';
import Logo from './image/pet-bay-sands-logo.svg';
import UserProfile from './components/UserProfile';
import BidTracker from './components/BidTracker';
import AddService from './components/AddService';
import PetProfile from './components/PetProfile';
import history from './history';
import { Menu, Icon, Button, Dropdown } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);
    console.log(document.cookie);
    this.state = {
      id: '',
      collapsed: true,
    }
  }

  onGoToAddPet (id, isCareTakerChosen) {
    this.setState({
      id: id,
      isCareTaker: isCareTakerChosen
    })
    history.push("/add-pet");
  }

  onGoToAddService() {
    history.push("/add-service");
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClick(e) {
  console.log('click', e);
}

  render() {
    return (
      <Router history = {history}>
        <div className="App">
          <div className="App-header">
          <NavLink to="/" style={{textDecoration: 'none'}}> <img src={Logo} className="App-logo"/></NavLink>
          {document.cookie.indexOf("userId=") >= 0 ?
          <div>
           <Button color="inherit" className="Button-view-bids ">
          <NavLink to="/login" style={{textDecoration: 'none'}}> View Bids</NavLink>
          </Button>
          <Dropdown
            className = "menu-button"
            placement="bottomRight"
            overlay={
            <Menu>
              <Menu.Item key="0">
                  <NavLink to="/user-profile" style={{textDecoration: 'none'}}> Edit Profile </NavLink>
              </Menu.Item>
              <Menu.Divider/>
              <Menu.Item key="3">Logout</Menu.Item>
            </Menu>
          }>
            <a className="ant-dropdown-link" href="#">
              <Icon type="user" /> Profile
            </a>
            </Dropdown>
            </div>
            :
            <div>
             <Button color="inherit" className="Button-app">
             <NavLink to="/login" style={{textDecoration: 'none'}}> Login</NavLink>
             </Button>
             <Button color="inherit" className="Button-app">
             <NavLink to="/signup" style={{textDecoration: 'none'}}>Signup</NavLink>
             </Button>
            </div>
          }
          </div>
          <Route
            exact path="/signup"
            render={({props}) => <Signup onGoToAddPet= {this.onGoToAddPet.bind(this)} />}/>
         <Route exact path="/" component={SearchForm} />
         <Route
            exact path="/add-pet"
            render={({props}) => <AddPet id= {this.state.id} isCareTaker= {this.state.isCareTaker} onGoToAddService={this.onGoToAddService.bind(this)}/>}/>
         <Route path="/add-service" component={AddService} />
         <Route exact path="/add-bid" component={AddBid} />
         <Route path="/user-profile" component={UserProfile} />
         <Route path="/login" component={Login} />
         <Route path="/bid-tracker" component={BidTracker} />
         <Route path="/pet-profile" component={PetProfile} />
         </div>
      </Router>
    );
  }
}

export default App;
