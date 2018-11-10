import React, {Component} from 'react';

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
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            onChange={this.changeHandler}
          />
          <br />
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            onChange={this.changeHandler}
          />
          <br />
          <input
            type="text"
            placeholder="firstname"
            name="firstname"
            id="firstname"
            onChange={this.changeHandler}
          />
          <br />
          <input
            type="text"
            placeholder="lastname"
            name="lastname"
            id="lastname"
            onChange={this.changeHandler}
          />{' '}
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={this.changeHandler}
          />{' '}
          <br />
          <input
            type="password"
            placeholder="passwordconf"
            name="passwordconf"
            id="passwordconf"
            onChange={this.changeHandler}
          />{' '}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
