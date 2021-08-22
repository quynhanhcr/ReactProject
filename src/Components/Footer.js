import React from 'react';
import logo from './../image/main-logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <img alt="logo" src={logo} />
                <span>A. Cinema</span>
            </div>
            <p>105 Tôn Dật Tiên, Phường Phú Mỹ, Quận 7, Tp. Hồ Chí Minh</p>
            <i>A. Cinema @2021. All rights reserved. Done by Quỳnh Anh.</i>
        </footer>
    );
};

export default Footer;