import React, {Component} from 'react';

export default class LoginComponent extends Component {
    render() {
        return (
            <section>
                <form>
                    <div>
                        <label>Username:</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        )
    }
}