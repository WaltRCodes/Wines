import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: '',
      winesHTML: '',
      newWine:{
        
          "name": "test",
          "year": 2020,
          "grapes": "",
          "country": "",
          "region": "",
          "description": "lorem ipsum",
          "picture": "",
          "price": 0
        
      }
    }

    this.createWine = this.createWine.bind(this);
  }
  async callApi() {
    try {
      const response = await axios.get('http://myapi-profstream.herokuapp.com/api/77accb/wines');
      
      console.log(response.data);
      console.log(response);
      let elements = response.data.map(wine => 
        <div key={wine["id"]}>
          <img src={wine["picture"]} />
          <h4>{wine["name"]} ({wine["year"]})</h4>
          <h5>{wine["grapes"]}</h5>
          <h6>{wine["country"], wine["Southern Rhone"]}</h6>
          <p>{wine["description"]}</p>
        </div>);
      this.setState({
        wines: response.data,
        winesHTML: elements
      })
    } catch (e) {
      console.log(e);
    }
  }
  createWine(){

  }
  componentDidMount() {

    this.callApi();
  }


  render() {
    return (
      <div>
        <div className="row">
        {this.state.winesHTML}
        </div>
      </div>
      
    )
  }
}