import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <div>Hello!</div>
    );
  }
}

App.propTypes = {
  example: PropTypes.string,
};

export default App;
