import React, {Component} from 'react';

export class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            placeholder="Login Email"
            type="email"
            name="email"
            id="emaillogin"
          />{' '}
          <br />
          <input
            placeholder="Login Password"
            type="password"
            name="password"
            id="passwordlogin"
          />{' '}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
