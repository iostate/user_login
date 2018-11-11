import React, {Component} from 'react';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      success: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', this.state).then(res => {
      if (res.data.error) {
        return this.setState({error: res.data.message});
      }
      return (window.location = '/mainpage');
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
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
          {this.state.error && <p>{this.state.error}</p>}
          <br />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
