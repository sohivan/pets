import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
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

  render() {
    return (
      <Router history = {history}>
        <div className="App">
          <div className="App-header">
             <NavLink to="/" style={{textDecoration: 'none'}}> <img src={Logo} className="App-logo"/></NavLink>
             <Button color="inherit" className="Button-app">
             <NavLink to="/login" style={{textDecoration: 'none'}}> Login</NavLink>
             </Button>
             <Button color="inherit" className="Button-app">
             <NavLink to="/signup" style={{textDecoration: 'none'}}>Signup</NavLink>
             </Button>
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
