import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import './index.css';

class App extends React.Component {
  // initialize app state 
  state = { lat: null,  errorMessage: '' };

  // handle callbacks / set state after component intially mounts/renders
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message})
    );
  }

  // helper method to seperate logic from render method
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    } else if (!this.state.errorMessage && this.state.lat) {
      return (
        <SeasonDisplay lat={this.state.lat}/>

      );
    }
    return (
      <Spinner message="Please accept location request"/>
    );
  }

  render() {
    return (
      <div className="border red"> {this.renderContent()} </div>     
    );
  }
}


ReactDOM.render(
  <App />, document.querySelector('#root')
);