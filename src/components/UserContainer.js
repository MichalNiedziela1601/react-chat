import React, {Component} from 'react';
import Header from './Header';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import BarChart from './BarChart';

export default class UserContainer extends Component {
    renderUserEmail = false;
    constructor(props) {
        super(props);
    }

    getAuthor = (author) => {
        if(!this.renderUserEmail) {
            this.renderUserEmail = true;
            return <p className="author">{author}</p>
        }
    };

    render() {
        return (
            <div id="UserContainer" className="inner-container">
                <Header>
                    <Link to="/">
                        <button className="red">Back to main</button>
                        <Dropdown/>
                    </Link>
                </Header>
                {this.props.messagesLoaded ? (
                        <div id="message-container">
                            {this.props.messages.map(msg => {
                                if(msg.user_id === this.props.userID) {
                                    return (
                                        <div key={msg.id} className="message">
                                            {this.getAuthor(msg.author)}
                                            {msg.msg}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ) : (
                        <div id="loading-container">
                            <img src="/assets/icon.png" id="loader" />
                        </div>
                    )}

            </div>
        )
    };
}