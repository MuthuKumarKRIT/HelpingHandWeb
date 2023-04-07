import { Component } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('token');
  }

  componentDidMount() {
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    this.handleLogout();
  }

  handleLogout = () => {
    window.history.go();
    window.location = "/login";
  }

  render() {
    return null;
  }
}
