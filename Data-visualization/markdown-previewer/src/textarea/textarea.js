import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Marked from 'marked';
import './textarea.css';

const MD_EXAMPLE = "Heading\n" +
                   "======\n\n" +
                   "Sub-heading\n" +
                   "-------\n\n" +
                   "### Another Heading\n\n" +
                   "Add two line breaks to create a paragraph\n\n" +
                   "Add two spaces at the end of line to create a  \n" +
                   "line break\n\n" +
                   "Text styles - *italic*, **bold**, `monospace` and ~~strikethrough~~" +
                   "\n\nUnordered List\n\n" +
                   "* FreeCodeCamp\n" +
                   "* Is\n" +
                   "* Awesome" +
                   "\n\nOrdered List\n\n" +
                   "1. Item 1\n" +
                   "2. Item 2\n" +
                   "3. Item 3" +
                   "\n\n" +
                   "[Go To FreeCodeCamp](https://freecodecamp.org)";  

export default class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {value: MD_EXAMPLE};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.getElementById('previewer').innerHTML = Marked(this.state.value);
    }

    handleChange(event) {
        this.setState({value: event.target.value}, function() {
            document.getElementById('previewer').innerHTML = Marked(this.state.value);
            console.log(Marked(this.state.value));
        });
    }

    render() {
        return <textarea onChange={this.handleChange} value={this.state.value}/>
    }
}
