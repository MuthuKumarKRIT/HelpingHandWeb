import React, { Component } from 'react';
import axios from 'axios';
import NavbarL from './navbar';
import './donate-list.css'
const Donate = props => (
  <tr>
    <td>{props.donate.pname}</td>
    <td>{props.donate.quant}</td>
    <td>{props.donate.description}</td>
  </tr>
)

export default class DonationList extends Component {
  constructor(props) {
    super(props);
    this.state = {donates: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/donates/')
      .then(response => {
        this.setState({ donates: response.data })
      })
      .catch((err) => {
        if(err.response.data.error=='/login'){
            window.location=err.response.data.error;
          }
          else{
          alert(err.response.data.error);
          }
      })
  }
  donateList() {
    return this.state.donates.map(currentdonate=> {
      return <Donate donate={currentdonate}/>;
    })
  }

  render() {
    return (
      <div>
        <NavbarL/>
        <h5>DONATIONS</h5>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Product Name</th>
              <th>Quantity(No/Weight in Kg)</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            { this.donateList() }
          </tbody>
        </table>
      </div>
    )
  }
}