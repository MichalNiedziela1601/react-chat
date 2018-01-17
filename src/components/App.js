import React, { Component} from 'react';
import './app.css';
import LoginComponent from './LoginComponent';
class App extends Component {
    render() {
        return (
            <div className="inner-container" id="container"><LoginComponent/></div>)
    }
}
export default App;