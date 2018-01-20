import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import './app.css';
import LoginComponent from './LoginComponent';
import ChatContainer from './ChatContainer';
import UserContainer from "./UserContainer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            messages: [],
            messagesLoaded: false
        }
    }

    onMessages = snapshot => {
        const messages = Object.keys(snapshot.val()).map(key => {
            const msg = snapshot.val()[key];
            msg.id = key;
            return msg;
        });
        this.setState({ messages});
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            } else {
                this.props.history.push('/login');
            }
        });

        firebase
            .database()
            .ref('/messages')
            .on('value', snapshot => {
                this.onMessages(snapshot);
                if(!this.state.messagesLoaded) {
                    this.setState({ messagesLoaded: true})
                }
            })
    }

    handleSubmitMessage = msg => {
        const data = {
            author: this.state.user.email,
            sentAt: Date.now(),
            user_id: this.state.user.uid,
            msg
        };
        firebase
            .database().ref('/messages')
            .push(data);
    };

    render() {
        return (
            <div id="container">
                <Route exact path="/login" component={LoginComponent}/>
                <Route exact path="/"
                    render={() => <ChatContainer
                        onSubmit={this.handleSubmitMessage}
                    messages={this.state.messages}
                    user={this.state.user}
                    messagesLoaded={this.state.messagesLoaded}/>}
                />
                <Route path="/users/:id"
                       render={({ history, match }) => (
                           <UserContainer
                               messages={this.state.messages}
                               messagesLoaded={this.state.messagesLoaded}
                               userID={match.params.id}
                           />
                       )}/>
                </div>)
    }
}
export default withRouter(App);