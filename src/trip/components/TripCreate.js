import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import TripForm from './TripForm';

class TripCreate extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      origin: '',
      destination: '',
      createdTripId: false,
      shouldRedirect: null,
      message: null,
    };
  }

  render() {
    console.log('trip create props: ', this.props)
    const { createdTripId, name, origin, destination } = this.state;

    if (createdTripId) {
      return <Redirect to={`/trips/${createdTripId}`} />;
    }

    const { handleSubmit } = this;

    return (
      <Fragment>
        <TripForm
          handleSubmit={handleSubmit}
          name={name}
          origin={origin}
          destination={destination}
          user={this.props.user}
        />
      </Fragment>
    );
  }
}

export default TripCreate;
