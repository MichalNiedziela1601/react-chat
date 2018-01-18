import React, {Component} from 'react';
import Header from './Header';
export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        }
    }

    signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => this.onLogin())
            .catch(err => {
                if('auth/user-not-found' === err.code) {
                    this.signUp();
                } else {
                    this.setState({error: 'Error login in'});
                }
            });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({error: ''});
        if (this.state.email && this.state.password) {
            this.login();
        } else {
            this.setState({error: 'Please fill both inputs'})
        }
    };

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onLogin = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <div id="LoginContainer" className="inner-container">
                <Header/>
                <form onSubmit={this.handleSubmit}>

                    <p>Sign in or sign up by enter your email and password</p>
                    <div>
                        <input type="text" placeholder="Your E-mail" name="email"
                               onChange={this.handleInputChange}
                               value={this.state.email}
                               />
                    </div>
                    <div>
                        <input type="password" placeholder="Your Password" name="password"
                               onChange={this.handleInputChange}
                               value={this.state.password}
                               />
                    </div>
                    <p className="error">{this.state.error}</p>
                    <div>
                        <button type="submit" className="red light">Login
                        </button>

                    </div>
                </form>
            </div>
        )
    }
}