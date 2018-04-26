import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Async from '../async';
import style from './leaderboard.css';

class TableItem extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.position}</td>
                <td><img src={this.props.img} alt="profile" /></td>
                <td>{this.props.username}</td>
                <td>{this.props.recent}</td>
                <td>{this.props.alltime}</td>
            </tr>
        );
    }
}

function showContents(el, type) {
    Async.getLeaderboard(type, data => {
        el.setState({recent: data}, () => {
            ReactDOM.render(
                <table>
                    <thead>
                        <th>#</th>
                        <th>Profile</th>
                        <th>Username</th>
                        <th onClick={el.showRecent}>Recent &#8744;</th>
                        <th onClick={el.showAllTime}>All Time &#8744;</th>
                    </thead>
                    <tbody>
                    {
                        data.map((item, i) => {
                            return(
                                <TableItem 
                                    key={String(i)}
                                    position={`#${i+1}`}
                                    img={item.img}
                                    username={item.username}
                                    recent={item.recent}
                                    alltime={item.alltime}
                                />
                            );
                        })
                    }
                    </tbody>
                </table>,
                document.getElementById('leaderboard')
            ) 
        });
    });
}

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recent: '',
            alltime: ''
        }

        this.showRecent = this.showRecent.bind(this);
        this.showAllTime = this.showAllTime.bind(this);
    }

    componentDidMount() {
        showContents(this, Async.recent);
    }

    showRecent() {
        showContents(this, Async.recent);
    }

    showAllTime() {
        showContents(this, Async.alltime);
    }

    render() {
        return(
            <div id="leaderboard">
            </div>
        )
    }
} 