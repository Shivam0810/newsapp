import './App.css';
import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 15
  const [progress, setProgress] = useState(0)
  return (
    <Router>
      <NavBar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        {["", "business", "entertainment", "general", "health", "science", "sports", "technology"].map((category) => {
          return <Route key={category} exact path={`/${category}`} element={<News key={category} apiKey={apiKey} pageSize={pageSize} country="in" category={category ? category : "general"} setProgress={setProgress} />} />
        })}
      </Routes>
    </Router>
  )
}
export default App