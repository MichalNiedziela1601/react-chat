import React, {Component} from 'react';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div id="dropdown">
                <button className="red buttonDrop" >Menu</button>
                <div className="dropdown">
                    <a href="#">One</a>
                    <a href="#">Two</a>
                    <a href="#">Three</a>
                </div>
            </div>
        )
    }
}