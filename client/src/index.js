import React from 'react';
import ReactDOM from 'react-dom';
import './views/css/styles.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Views
import App from './views/Components/App';
import Home from './views/Containers/Home';

ReactDOM.render(

    <Router>
        <App>
            <Route exact path='/' component={Home}/>
        </App>
    </Router>

    ,document.getElementById('root'));