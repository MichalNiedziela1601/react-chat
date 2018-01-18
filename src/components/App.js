import React, {Component} from 'react';
import './app.css';
import LoginComponent from './LoginComponent';
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
            }
        });
    }

    render() {
        return (
            <div className="inner-container" id="container">
                <p>{this.state.user.email}</p>
                <LoginComponent/></div>)
    }
}
export default App;