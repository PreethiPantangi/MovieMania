import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './header.css'
import { logoutUserFromApp } from '../../../redux'

function HeaderComponent(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">Movie Mania</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <div className="nav-link"><Link to='/' >Movies</Link></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link"><Link to='/tvshows' >Tv Shows</Link></div>
                    </li>
                    {
                        props.authResponse.isLoggedOut ?
                            <Redirect to={props.authResponse.redirectTo} />
                            : null
                    }
                    {props.authResponse && props.authResponse.success ?
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <span className="dropdown-item">{props.authResponse.username}</span>
                                <span className="dropdown-item"><Link to='/profile' >Profile</Link></span>
                                <span className="dropdown-item" onClick={() => props.logoutUserFromApp()}>Logout</span>
                            </div>
                        </li> :
                        <li className="nav-item">
                            <div className="nav-link"><Link to='/login' >Login</Link></div>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        authResponse: state.authenticateUser.authResponse,
        logoutUser: state.authenticateUser.authResponse
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUserFromApp: () => {
            dispatch(logoutUserFromApp());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);