import React, {Component} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

export default class UserContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="UserContainer" className="inner-container">
                <Header>
                    <Link to="/">
                        <button className="red">Back to main</button>
                    </Link>
                </Header>
                <h1>Hello from User Container for User {this.props.match.params.id}</h1>
            </div>
        )
    };
}