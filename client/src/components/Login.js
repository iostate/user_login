import React, {Component} from 'react';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/login', this.state)
      .then(result => console.log(result))
      .catch(error => console.log(error.result));
  }
  render() {
    return (
      <div>
        <form>
          <input
            placeholder="Login Email"
            type="email"
            name="email"
            id="emaillogin"
            onChange={this.changeHandler}
          />{' '}
          <br />
          <input
            placeholder="Login Password"
            type="password"
            name="password"
            id="passwordlogin"
            onChange={this.changeHandler}
          />{' '}
          <br />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
