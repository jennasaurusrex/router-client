import React, { Fragment, Component } from 'react';
import axios from 'axios';
import apiUrl from './apiConfig';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import Map from '@material-ui/icons/Map';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      trips: null,
    };
  }

  componentDidMount() {
    axios({
      url: apiUrl + '/trips',
      method: 'get',
      headers: {
        Authorization: `Token token=${this.props.user.token}`,
      },
    })
      .then(response => this.setState({ trips: response.data.trips }))
      .catch(console.error);
  }

  render() {
    return (
      <Fragment>
        <p className="home">
          router.<span className="jn">jn</span>
        </p>
        <span className="map">
          <Map />
        </span>
        <p className="sub-home">Route. Plan. Go.</p>
        <hr />
        <span>
          <center>
            <Link to="/trip-create" user={this.props.user}>
              <Button color="primary">
                <AddCircle />
                Create a trip
              </Button>
            </Link>
            <Link to="/trips" user={this.props.user}>
              <Button color="primary">View your trips</Button>
            </Link>
          </center>
        </span>
      </Fragment>
    );
  }
}

export default Home;
