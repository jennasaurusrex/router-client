import React, { Component } from 'react';
import './App.scss';
import { withRouter } from 'react-router-dom';

import Layout from './wrappers/components/Layout';

import 'typeface-roboto';
import axios from 'axios'
import apiUrl from './apiConfig'

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    name: '',
    origin: '',
    destination: '',
    message: null,
    user: {},
    trip: {}
  }

  handleChange = (e) => {
    console.log('name: ', e.target.name)
    console.log('value:', e.target.value)
    const updatedField = { [e.target.name]: e.target.value };
    this.setState(updatedField);
  }

  saveUser = (user) => {
    this.setState((prevState) => ({ ...prevState, user }))
  }

  saveTrip = (trip) => {
    this.setState((prevState) => ({ ...prevState, trip }))
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, origin, destination } = this.state;

    if (name.length === 0 || origin.length === 0 || destination.length === 0) {
      return this.setState(prevState => ({...prevState, message: 'Field cannot be empty'}))
    }

    axios({
      url: apiUrl + '/trips',
      method: 'post',
      headers: {
        Authorization: `Token token=${this.state.user.token}`,
      },
      data: {
        trip: {
          name,
          origin,
          destination,
        },
      },
    })
      .then(response => this.setState({ createdTripId: response.data.trip.id }))
      .catch(() => this.setState({ shouldRedirect: true }));
  };

  render () {
    console.log('provider state is: ', this.state)
    return (
      <MyContext.Provider value={{
        state: this.state,
        handleChange: this.handleChange,
        handleSubmit: this.handleSumbit,
        saveUser: this.saveUser,
        saveTrip: this.saveTrip
      }}>
      {this.props.children}
      </MyContext.Provider>
    )
  }
}

class App extends Component {
  state = {
    user: null,
    alerts: [],
  };

  render() {
    return (
      <MyProvider>
      <Layout />
      </MyProvider>
    );
  }
}

export default withRouter(App);
