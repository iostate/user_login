import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

// App.propTypes = {
//   txt: PropTypes.string.isRequired,
//   message(props, propName, component) {
//     if (!(propName in props)) {
//       console.log(`missing ${propName}`);
//       return new Error(`missing ${propName}`);
//     }
//   },
// };

// const Title = props => <h1>Title: {props.text} </h1>;

// Title.propTypes = {
//   text(props, propName, component) {
//     if (!(propName in props)) {
//       return new Error(`missing ${propName}`);
//     }
//   },
// };

export default App;
