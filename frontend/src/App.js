import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchForm from './components/SearchForm';
import AddPet from './components/AddPet';
import AddBid from './components/AddBid';
import Logo from './image/pet-bay-sands-logo.svg';
import CreateProfile from './components/CreateProfile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
             <img src={Logo} className="App-logo"/>
             <Button color="inherit" className="Button-app">
             <NavLink to="/login" style={{textDecoration: 'none'}}> Login</NavLink>
             </Button>
             <Button color="inherit" className="Button-app">
             <NavLink to="/signup" style={{textDecoration: 'none'}}>Signup</NavLink>
             </Button>
          </div>
         <Route path="/signup" component={Signup} />
         <Route exact path="/" component={SearchForm} />
         <Route exact path="/add-pet" component={AddPet} />
         <Route exact path="/add-bid" component={AddBid} />
         <Route path="/create-profile" component={CreateProfile} />
         <Route path="/login" component={Login} />
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
