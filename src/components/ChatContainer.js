import React, { Component } from 'react';
import Header from './Header';
export default class ChatContainer extends Component {

    signOut = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <div id="ChatContainer" className="inner-container">
                <Header>
                    <button className="red" onClick={this.signOut}>Logout</button>
                </Header>
                <h1>Hello from Chat container</h1>
            </div>
        )
    }
}