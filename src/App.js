import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: '',
      winesHTML: ''
    }
  }
  async callApi() {
    try {
      const response = await axios.get('http://myapi-profstream.herokuapp.com/api/77accb/wines');
      this.setState({
        wines: response.data
      })
      console.log(response.data);
      console.log(response);
      let elements = response.data.map(wine => 
        <div>
          <img src={wine["picture"]} />
        </div>);
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {

    this.callApi();
  }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}