import './App.css';
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import About from './Component/About';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export class App extends Component {
  api = process.env.REACT_APP_NEWS_API;
  
  state={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (
      
      // use Key in compnent call to force it to remount the compenent
      <Router>
       
        <Navbar SearchBar={false} />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
         
        />
        <Routes >
          <Route path="business/*" element={
            <News setProgress={this.setProgress} key='business' pagesize={5} country='US' category="business" apiKey={this.api} />
          }>
          </Route>
          <Route path="general/*" element={
            <News setProgress={this.setProgress} key='general' pagesize={5} country='US' category="general" apiKey={this.api} />
          }>
          </Route>
          <Route path="/" element={
            <News setProgress={this.setProgress} key='general' pagesize={5} country='US' category="general" apiKey={this.api} />
          }>
          </Route>
          <Route path="entertainment/*" element={
            <News setProgress={this.setProgress} key='entertainment' pagesize={5} country='US' category="entertainment" apiKey={this.api} />
          }>
          </Route>
          <Route path="health/*" element={
            <News setProgress={this.setProgress} key='health' pagesize={5} country='US' category="health" apiKey={this.api} />
          }>
          </Route>
          <Route path="science/*" element={
            <News setProgress={this.setProgress} key='science' pagesize={5} country='US' category="science" apiKey={this.api} />
          }>
          </Route>
          <Route path="sports/*" element={
            <News setProgress={this.setProgress} key='sports' pagesize={5} country='US' category="sports" apiKey={this.api} />
          }>
          </Route>
          <Route path="technology/*" element={
            <News setProgress={this.setProgress} key='technology' pagesize={5} country='US' category="technology" apiKey={this.api} />
          }>
          </Route>
          <Route exact path="About/*" element={<About />}>
          </Route>

        </Routes > 


      </Router>
      
    );
  }
}


export default App;
