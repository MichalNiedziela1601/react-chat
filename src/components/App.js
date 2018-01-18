import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import './app.css';
import LoginComponent from './LoginComponent';
import ChatContainer from './ChatContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            } else {
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return (
            <div id="container">
                <Route exact path="/login" component={LoginComponent}/>
                <Route exact path="/" component={ChatContainer}/>
                </div>)
    }
}
export default withRouter(App);