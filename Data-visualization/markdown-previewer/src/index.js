import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header/header';
import TextArea from './textarea/textarea';
import Previewer from './previewer/previewer'

class Wrapper extends Component {
    render() {
        return(
            <div id="wrapper">
                <Header />
                <div className="container">
                    <TextArea />
                    <Previewer />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Wrapper />, 
    document.getElementById('root')
);