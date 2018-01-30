import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header/header';
import Leaderboard from './leaderboard/leaderboard';
import './index.css';


class Wrapper extends Component {
    render() {
        return(
            <div id="wrapper">
                <Header />
                <Leaderboard />
            </div>
        );
    }
}

ReactDOM.render(
    <Wrapper />,
    document.getElementById('root')
);
