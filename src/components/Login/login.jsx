import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { validateUser } from '../../redux'
import './login.css'
import LinearProgress from '@material-ui/core/LinearProgress';

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h3 className="center-text">Login</h3>
            <form className="login_component" >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username/Email</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username/Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => props.authenticateUser(username, password)}>Login</button>
                {props.isLoading ? <LinearProgress /> : null}
                {!props.isLoggedOut && props.redirectTo ? <Redirect to={props.redirectTo} /> : null}
            </form>
            {props.status_code === 30 ?
                <div>
                    <div>
                        <div className="error-message" ><small>Invalid username and/or password: You did not provide a valid login.</small></div>
                        <div className="error-message" ><small>Ensure you use the MovieDB credentials.</small></div>
                    </div>
                    <div className="error-message-create_account" >
                        Click <a href="https://www.themoviedb.org/login" rel="noreferrer" target="_blank">here</a> to create an account.
                    </div>
                </div>
                : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.authenticateUser.loading,
        redirectTo: state.authenticateUser.authResponse && state.authenticateUser.authResponse.redirectTo,
        status_code: state.authenticateUser.authResponse.status_code,
        isLoggedOut: state.authenticateUser.authResponse.isLoggedOut
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (username, password) => {
            dispatch(validateUser(username, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);