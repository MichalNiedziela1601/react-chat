import React from 'react';

const Header = (props) => {
    return (
        <header id="Header">
            <img src="/assets/icon.png" alt="logo"/>
                <h1>Chatastrope</h1>
            {props.children}

        </header>
    )
};

export default Header;