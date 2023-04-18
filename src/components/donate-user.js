import React, { Component } from 'react';
import axios from 'axios';
import NavbarL from './navbar';
import './donate-list.css'
const DonateL = props => (
  <tr>
    <td>{props.donate.pname}</td>
    <td>{props.donate.quant}</td>
    <td>{props.donate.description}</td>
  </tr>
)

export default class DonationListL extends Component {
  constructor(props) {
    super(props);
    this.state = {donatess: []};
  }

  componentDidMount() {
    const name = sessionStorage.getItem('name');
    axios.get('http://localhost:5000/donates/view',{ params: { name } })
      .then(response => {
        this.setState({donatess: response.data })
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
    if(this.state.donatess.length==0){
      return (
        <tr>
          <td colSpan="3" className="text-center">No results found</td>
        </tr>
      );
    }
    return this.state.donatess.map(currentdonate=> {
      return <DonateL donate={currentdonate}/>;
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
              <th>Description</th>
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