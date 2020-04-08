import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: '',
      winesHTML: '',
          name: "test",
          year: 2020,
          grapes: "",
          country: "",
          region: "",
          description: "lorem ipsum",
          picture: "",
          price: 0,
       newWineObject: {
        name: "test",
        year: 2020,
        grapes: "",
        country: "",
        region: "",
        description: "lorem ipsum",
        picture: "",
        price: 0,
       }   
    }

    this.createWine = this.createWine.bind(this);
    this.takeName = this.takeName.bind(this);
    this.takeYear = this.takeYear.bind(this);
    this.takeGrapes = this.takeGrapes.bind(this);
    this.takeCountry = this.takeCountry.bind(this);
    this.takeRegion = this.takeRegion.bind(this);
    this.takeDescription = this.takeDescription.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.takePrice = this.takePrice.bind(this);
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
          <h6>{wine["country"], wine["region"]}</h6>
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
  createWine(event){
    event.preventDefault();
  }
  takeName(event){
    this.setState({name: event.target.value});
  }
  takeYear(event){
    this.setState({year: event.target.value});
  }
  takeGrapes(event){
    this.setState({grapes: event.target.value});
  }
  takeDescription(event){
    this.setState({description: event.target.value});
  }
  takeCountry(event){
    this.setState({country: event.target.value});
  }
  takeRegion(event){
    this.setState({region: event.target.value});
  }
  takePicture(event){
    this.setState({picture: event.target.value});
  }
  takePrice(event){
    this.setState({price: event.target.value});
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
        <form id="main" onSubmit={this.createWine}>
          <h1>Enter your own wine</h1>
          <label>
              Wine Name
              <input type="text" onChange={this.takeName} placeholder="Wine"/>
          </label>
          <label>
              Wine Year
              <input type="number" onChange={this.takeYear} placeholder="Wine"/>
          </label>
          <label>
              <input type="submit" value="Submit"/>
          </label>
        </form>
      </div>
      
    )
  }
}