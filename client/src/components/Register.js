import React, {Component} from 'react';
import axios from 'axios';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      passwordconf: '',
      userdata: null,
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
    axios
      .post('http://localhost:8000/api/register', this.state)
      // .then(result => console.log(result.data))
      .then(result => {
        // this.setState({
        //   [errors]: result.data.errors,
        // });
        if (result.data.errors) {
          console.log(result);
          // places errors property onto state w/ errors
          return this.setState(result.data);
        }
        console.log(result);

        return this.setState({userdata: result.data});
      });
    // .catch(error => console.log(error.result));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            onChange={this.changeHandler}
          />
          {this.state.errors && this.state.errors.username && (
            <p>{this.state.errors.username.msg}</p>
          )}
          <br />
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            onChange={this.changeHandler}
          />
          {this.state.errors && this.state.errors.email && (
            <p>{this.state.errors.email.msg}</p>
          )}
          <br />
          <input
            type="text"
            placeholder="firstname"
            name="firstname"
            id="firstname"
            onChange={this.changeHandler}
          />
          {this.state.errors && this.state.errors.firstname && (
            <p>{this.state.errors.firstname.msg}</p>
          )}
          <br />
          <input
            type="text"
            placeholder="lastname"
            name="lastname"
            id="lastname"
            onChange={this.changeHandler}
          />{' '}
          {this.state.errors && this.state.errors.lastname && (
            <p>{this.state.errors.lastname.msg}</p>
          )}
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={this.changeHandler}
          />{' '}
          {this.state.errors && this.state.errors.password && (
            <p>{this.state.errors.password.msg}</p>
          )}
          <br />
          <input
            type="password"
            placeholder="passwordconf"
            name="passwordconf"
            id="passwordconf"
            onChange={this.changeHandler}
          />{' '}
          {this.state.errors && this.state.errors.passwordconf && (
            <p>{this.state.errors.passwordconf.msg}</p>
          )}
          <br />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
