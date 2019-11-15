import React from 'react';

import { connect } from 'react-redux';
import {Form, Button, Alert, Col, Row, Nav} from 'react-bootstrap';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import {NavLink} from "react-router-dom";



class Session extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    logout(ev) {
        ev.preventDefault();
        localStorage.removeItem('session');
        this.props.dispatch({
            type: 'LOG_OUT',
        });
        this.redirect('/');
    }

    render() {
        console.log("before", this.state);
        if (this.state.redirect) {
            console.log(this.state);
            return (
                <Redirect to={this.state.redirect} />
            )

        }
        let {session} = this.props;
        if (session) {
            let t = session.is_manager ? "Manager: " : "Worker: ";
            return (
                <Nav>
                    <Nav.Item>
                        <p className="text-light py-2">{t + session.user_name}</p>
                    </Nav.Item>
                    <Nav.Item>
                        <a className="nav-link" href="#" onClick={this.logout.bind(this)}>Logout</a>
                    </Nav.Item>
                </Nav>
            );
        }
        else {
            console.log("there");
            return (
                <Nav>
                    <Nav.Item>
                        <NavLink to="/login" exact activeClassName="active" className="nav-link">
                            Login
                        </NavLink>
                    </Nav.Item>
                </Nav>
            );
        }
    }
}


export default connect(({session}) => ({session}))(Session);
