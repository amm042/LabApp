import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './img/CompSciLogo.png';

import { NavLink, Link } from 'react-router-dom';

import { CLIENT_ID } from './keys/GoogleOAuth';
import MainContent from './jsx/MainContent';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import initialState from './redux/reducers';

import './css/App.css';
import './css/Theme.css';

const store = createStore(initialState, );

class App extends Component {

  constructor(props) {
    super(props);

    this.setGoogleLogin = this.setGoogleLogin.bind(this);
    this.errorGoogleLogin = this.errorGoogleLogin.bind(this);
    this.selectTest = this.selectTest.bind(this);
  }

  state = {
    page: 'home',
    loggedIn: false,
    profile: {},
    token: -1,
    error: null
  }

  selectTest(response) {
    this.setState({ page: response });
  }

  setGoogleLogin(response) {
    this.setState({
      loggedIn: true,
      profile: response.profileObj,
      token: response.tokenId
    });
  }

  errorGoogleLogin(response) {
    this.setState({
      error: response,
    });
  }

  getGoogleLogin() {
    return (
        <div style={{ marginTop: 100 }}>
            <img src={logo} alt="CompSci Logo" style={{ width: 600 }} />
            <br /><br />
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={this.setGoogleLogin}
                onError={this.errorGoogleLogin} />
            <div>{this.state.error}</div>
        </div>
    );
  }

  getMainPage() {
    const location = window.location.pathname.split('/')[1];
    return (
        <div>
            <Navbar onSelect={this.selectTest} fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand className={(this.props.location === '') ? 'active' : null}>
                        <Link to="/"><img src={logo} alt="Bucknell Computer Science Department" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <li className={location === 'homeworks' ? "active" : ""}>
                          <NavLink to="/homeworks">
                              Homeworks
                          </NavLink>
                        </li>
                        <li className={location === 'calendar' ? "active" : ""}>
                          <NavLink to="/calendar">
                              Calendar
                          </NavLink>
                        </li>
                        <li className={location === 'classes' ? "active" : ""}>
                          <NavLink to="/classes">
                              Classes
                          </NavLink>
                        </li>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={5}>
                            <div style={{ display: 'inline-block', marginTop: 15, marginBottom: 15 }}>
                                {this.state.profile.name}
                            </div>
                            <img src={this.state.profile.imageUrl} alt="User Profile" />
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="main-content">
                <MainContent />
            </div>
        </div>
      );
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
            { (this.state.loggedIn === false) ? this.getGoogleLogin() : this.getMainPage() }
        </div>
      </Provider>
    );
    // return (
    //   <div className="App">
    //       { (this.state.loggedIn === false) ? this.getGoogleLogin() : this.getMainPage() }
    //   </div>
    // );
  }
}

export default App;
