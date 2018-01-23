import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import './app.css';
import LoginComponent from './LoginComponent';
import ChatContainer from './ChatContainer';
import UserContainer from "./UserContainer";
import BarChart from './BarChart';
import NotificationResurces from '../resources/NotificationResources';

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
                this.notifications.changeUser(user);
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
            });

        this.notifications = new NotificationResurces(firebase.messaging(), firebase.database())
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
                <Route exec path="/char" component={BarChart} />
                </div>)
    }
}
export default withRouter(App);