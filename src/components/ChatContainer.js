import React, {Component} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
export default class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    messageEnd = null;

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        if(this.messageEnd) {
            this.messageEnd.scrollIntoView({ behavior: 'smooth'})
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    onHandleMessage = (event) => {
        this.setState({message: event.target.value})
    };

    handleKeyDown = e => {
        if ('Enter' === e.key) {
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
                {this.props.messagesLoaded ? (
                        <div id="message-container">
                            {this.props.messages.map((message,i) => (
                                <div key={message.id}
                                     ref={el => {this.messageEnd = el}}
                                     className={`message ${this.props.user.email === message.author && 'mine'}`}>
                                    <p>{message.msg}</p>
                                    {(!this.props.messages[i +1] ||
                                    this.props.messages[i+1].author !== message.author) &&
                                    (<p className="author">
                                        <Link to={`/users/${message.user_id}`}>{message.author}</Link>
                                    </p>)
                                    }
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div id="loading-container">
                                <img src="/assets/icon.png" id="loader" />
                            </div>
                        )}
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