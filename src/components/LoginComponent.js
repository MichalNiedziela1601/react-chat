import React, {Component} from 'react';
import Header from './Header';
export default class LoginComponent extends Component {
    state = { email: '', password: ''};
    handleCLick = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    handleInputChange = (event, property) => {
        this.setState({ [property] : event.target.value});
    };

    handleBlur = (field) => (event) => {
        event.target.style.background = 'red';
    };

    render() {
        return (
                <div id="LoginContainer" className="inner-container"><form>
                    <Header/>
                    <p>Sign in or sign up by enter your email and password</p>
                    <div>
                        <input type="text" placeholder="Your E-mail"

                        onChange={($event) => this.handleInputChange($event, "email")}
                        value={this.state.email}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Your Password"
                        onChange={($event) => this.handleInputChange($event, "password")}
                        value={this.state.password}/>
                    </div>
                    <div>
                        <button type="submit" className="red light"
                        onClick={ ($event) => this.handleCLick($event)} >Login</button>
                    </div>
                </form></div>
        )
    }
}