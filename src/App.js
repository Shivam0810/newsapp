import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={5} country="in" category="general" />} />
          {["business", "entertainment", "general", "health", "science", "sports", "technology"].map((category) => {
            return <Route key={category} exact path={`/${category}`} element={<News key={category} pageSize={5} country="in" category={category} />} />
          })}
        </Routes>
      </Router>
    )
  }
}
