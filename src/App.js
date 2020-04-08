import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);
    {/* store the wine info and html info that the page will use*/}
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
    {/* make all the mehods that will be utilized*/}
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
      {/* call the API and create HTML elements*/}
      console.log(response.data);
      console.log(response);
      let elements = response.data.map(wine => 
        <div key={wine["id"]} className="wine" tabIndex="1">
          <img src={wine["picture"]} height="200px" width="100%"/>
          <h4>{wine["name"]} ({wine["year"]})</h4>
          <h5>{wine["grapes"]}</h5>
          <h6>{wine["country"], wine["region"]}</h6>
          <p>{wine["description"]}</p>
          <button onClick={() => this.deleteApi(wine["id"])}>Delete This</button>
        </div>);
        {/* store the values in state*/}
      this.setState({
        wines: response.data,
        winesHTML: elements
      })
    } catch (e) {
      console.log(e);
    }
  }
  async postApi(object) {
    try {
      const response = await axios.post('http://myapi-profstream.herokuapp.com/api/77accb/wines',object);
      {/* update the API with new wine*/}
      console.log(response.data);
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  }
  async deleteApi(id) {
    console.log("This is running",id);
    try {
      const response = await axios.delete('http://myapi-profstream.herokuapp.com/api/77accb/wines/'+id);
      {/* delete a single wine on the api*/}
      console.log(response.data);
      console.log(response);
      this.callApi();
    } catch (e) {
      console.log(e);
    }
  }
  createWine(event){
    event.preventDefault();
    let wine = {
      
        name: this.state.name,
        year: this.state.year,
        grapes: this.state.grapes,
        country: this.state.country,
        region: this.state.region,
        description: this.state.description,
        picture: this.state.picture,
        price: this.state.price,
        
    };
    {/* create a new wine in state and api after the form has been submitted*/}
    this.postApi(wine);
    this.setState({newWineObject: wine});
    this.callApi();
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
{/* call the api on page load*/}
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
          <br />
          <label>
              Wine Year
              <input type="number" onChange={this.takeYear} placeholder="Year"/>
          </label>
          <br />
          <label>
              Wine Grapes
              <input type="text" onChange={this.takeGrapes} placeholder="Grapes"/>
          </label>
          <br />
          <label>
              Wine Country
              <input type="text" onChange={this.takeCountry} placeholder="Country"/>
          </label>
          <br />
          <label>
              Wine Region
              <input type="text" onChange={this.takeRegion} placeholder="Region"/>
          </label>
          <br />
          <label>
              Wine Description
              <input type="text" onChange={this.takeDescription} placeholder="Description"/>
          </label>
          <br />
          <label>
              Wine Price
              <input type="number" onChange={this.takePrice} placeholder="Price"/>
          </label>
          <br />
          <label>
              Wine Picture URL
              <input type="url" onChange={this.takePicture} placeholder="URL"/>
          </label>
          <br />
          <label>
              <input type="submit" value="Submit"/>
          </label>
        </form>
      </div>
      
    )
  }
}