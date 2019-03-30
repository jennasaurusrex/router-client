import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
// key: AIzaSyDcBawyHNF87ZUvsjU_l5xMhMPBd8m58z4

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcBawyHNF87ZUvsjU_l5xMhMPBd8m58z4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 42.3601, lng: 71.0589 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 42.3601, lng: 71.0589 }} />
    )}
  </GoogleMap>
));

export default MyMapComponent;
