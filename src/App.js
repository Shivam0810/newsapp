import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          {["", "business", "entertainment", "general", "health", "science", "sports", "technology"].map((category) => {
            return <Route key={category} exact path={`/${category}`} element={<News key={category} apiKey={this.apiKey} pageSize={15} country="in" category={category ? category : "general"} setProgress={this.setProgress} />} />
          })}
        </Routes>
      </Router>
    )
  }
}
