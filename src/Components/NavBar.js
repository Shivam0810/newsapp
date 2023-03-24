// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NavBar extends Component {
    static propTypes = {}
    capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/general">NewsMonkey</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/general">Home</Link>
                                </li>
                                {["business", "entertainment", "general", "health", "science", "sports", "technology"].map((category) => (
                                    <li key={category} className="nav-item">
                                        <Link className="nav-link" to={`/${category}`}>{this.capitalize(category)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar