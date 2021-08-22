import React from 'react';
import logo from './../image/main-logo.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import userAction from '../Redux/actions'

const Header = () => {

    const {currentUser, access_token} = useSelector(state => state.user);
    const dispatch = useDispatch();    
    
    return (
        <header>
            <div className="container h-100 d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img alt="logo" src={logo} />
                    <span>A. Cinema</span>
                </div>
                <div className="navigation d-none d-md-block">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Trang chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/aboutus">Giới thiệu chung</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Liên hệ</Link>
                        </li>
                    </ul>
                </div>

                <div className="sub-navigation">
                    {currentUser && access_token ? (
                    <>
                        <div className="fa fa-user-o user-icon">{currentUser.name}</div>
                        <div className="fa fa-power-off quit-icon" onClick={()=>dispatch(userAction.logOut())}>Thoát</div>
                    </> ): <Link to="/log-in">ĐĂNG NHẬP</Link>}
                    
                </div>
            </div>


        </header>
    );
};

export default Header;