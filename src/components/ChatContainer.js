import React, {Component} from 'react';
import Header from './Header';
export default class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    onHandleMessage = (event) => {
        this.setState({message: event.target.value})
    };

    handleKeyDown = e => {
        if('Enter' === e.key) {
            e.preventDefault();
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.message);
        this.setState({message: ''});
    };

    render() {
        return (
            <div id="ChatContainer" className="inner-container">
                <Header>
                    <button className="red" onClick={this.signOut}>Logout</button>
                </Header>
                <div id="message-container">

                </div>
                <div id="chat-input">
                    <textarea placeholder="Write your message..."
                              onChange={this.onHandleMessage}
                              value={this.state.message}
                    onKeyDown={this.handleKeyDown}></textarea>
                    <button onClick={this.handleSubmit}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}