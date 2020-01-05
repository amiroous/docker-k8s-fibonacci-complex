import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fib from "./components/Fib";
import OtherPage from "./pages/OtherPage";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Fibonacci Calculator Using Docker and K8s</h1>
                    <div className="links">
                        <Link to="/" className="link">Home</Link>
                        <Link to="/otherpage" className="link">Other Page</Link>
                    </div>
                </header>
                <div>
                    <Route exact path="/" component={Fib}/>
                    <Route exact path="/otherpage" component={OtherPage}/>
                </div>
            </div>
        </Router>
    );
}

export default App;
