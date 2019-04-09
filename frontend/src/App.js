import React, { Component } from 'react';
import './App.css';
import { Router , Redirect, Switch } from 'react-router-dom';
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
import { Menu, Icon, Button, Dropdown, message } from 'antd';

const PrivateRoute = ({ component: Component, authenticated }) => (
<Route render={(props) => (
    authenticated === true
    ? <Component {...props} />
    : <Redirect to={{
          pathname: '/',
        }} />
)} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      collapsed: true,
      cookie: null,
      isAuthenticated: localStorage.getItem("email") ? true : false
    }
  }


  onGoToAddPet (id, isCareTakerChosen) {
    this.setState({
      id: id,
      isCareTaker: isCareTakerChosen
    })

    history.push("/add-pet");
  }

  refreshLoginState() {
    this.setState({
      isAuthenticated: localStorage.getItem("email") ? true : false
    })
  }

  loginSuccess() {
    this.refreshLoginState();
  }

  onGoToAddService() {
    this.refreshLoginState();
    history.push("/add-service");
  }

  logout() {
    var request = new Request("http://localhost:3001/logout", {
       method: 'POST',
       headers: new Headers({'Content-Type': 'application/json'}),
       credentials: 'include',
     });

     fetch(request)
     .then((response) => {
       if (!response.ok) {
         message.error('An error occurred. Please try again.');
       } else {
         response.json()
         .then((data) => {
           localStorage.removeItem("email");
           this.refreshLoginState();
         })
       }
     })
   }


  render() {
    return (
      <Router history = {history}>
        <div className="App">
          <div className="App-header">
          <NavLink to="/" style={{textDecoration: 'none'}}> <img src={Logo} className="App-logo"/></NavLink>
          {this.state.isAuthenticated ?
          <div>
           <Button color="inherit" className="Button-view-bids ">
          <NavLink to="/bid-tracker" style={{textDecoration: 'none'}}> View Bids</NavLink>
          </Button>
          <Dropdown
            className = "menu-button"
            placement="bottomRight"
            overlay={
            <Menu>
              <Menu.Item key="0">
                  <NavLink to="/my-user-profile" style={{textDecoration: 'none'}}> Edit Profile </NavLink>
              </Menu.Item>
              <Menu.Divider/>
              <Menu.Item key="3" onClick={this.logout.bind(this)}>Logout</Menu.Item>
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

          <Switch>
          <Route exact path="/" component={SearchForm} />

          <Route
            exact path="/signup"
            render={({props}) => <Signup onGoToAddPet= {this.onGoToAddPet.bind(this)} onGoToAddService={this.onGoToAddService.bind(this)}/>}/>
         <PrivateRoute
            authenticated={this.state.isAuthenticated}
            exact path="/add-pet"
            render={({props}) => <AddPet id= {this.state.id} isCareTaker= {this.state.isCareTaker} onGoToAddService={this.onGoToAddService.bind(this)}/>}/>
         <PrivateRoute exact path="/add-service" component={AddService} authenticated={this.state.isAuthenticated}/>
         <PrivateRoute exact path="/add-bid" component={AddBid} authenticated={this.state.isAuthenticated}/>
         <Route exact path="/user-profile" component={UserProfile}/>
         <PrivateRoute exact path="/my-user-profile" component={UserProfile} authenticated={this.state.isAuthenticated}/>
         <Route
            path="/login"
            render={({props}) => <Login loginSuccess= {this.loginSuccess.bind(this)}/>}/>
         <PrivateRoute exact path="/bid-tracker" component={BidTracker} authenticated={this.state.isAuthenticated}/>
         <PrivateRoute exact path="/pet-profile" component={PetProfile} authenticated={this.state.isAuthenticated}/>
         </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
