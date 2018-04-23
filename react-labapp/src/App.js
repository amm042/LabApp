/**
 * Components
 */
import React, { Component } from 'react'
import {Container } from 'reactstrap'
import Favicon from 'react-favicon'

/**
 * Styles and images
 */
import './App.css';

import favicon from './img/CSLogo.png'

/**
 * Config
 */
import config from './config.json'

/**
 * custom UI components & routes
 */
import Wait from './components/wait'
import Login from './components/login'
import MainNav from './components/nav'
import Student from './routes/student'
import Ta from './routes/ta'

/**
 * Main app entry point.
 * There is almost no reason to be editing this file.
 * Edit the appropriate routes instead.
 */
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,      // true before mounted
      isSignedIn: false,  // is google user signed in?
      userType: null,     // student, ta, instructor, etc. (string)
      googleUser: null,   // google user object once signed in
    }
    this.signin = this.signin.bind(this)
    this.signout = this.signout.bind(this)
  }
  componentDidMount(){
    this.setState({loading:false})
  }

  /**
   * signin callback for google auth, this can be called on failure.
   */
  signin(g){
    if ('error' in g){
      console.log("ERR: ", g.error)
    }else{
      // extract profile info here.
      const basicProfile = g.getBasicProfile()
      const authResponse = g.getAuthResponse()
      g.googleId = basicProfile.getId()
      g.tokenObj = authResponse
      g.tokenId = authResponse.id_token
      g.accessToken = authResponse.access_token
      g.profileObj = {
        googleId: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName()
      }

      this.setState({
        isSignedIn:true,
        googleUser: g
      })
    }
  }

  /**
   * signout callback for google auth, only called on success
   * https://github.com/anthonyjgrove/react-google-login/issues/130
   */
  signout(){
    const auth2 = window.gapi.auth2.getAuthInstance()
    if (auth2 != null) {
      auth2.signOut().then(
        auth2.disconnect().then(
        () => {

          this.setState({
            isSignedIn: false,
            googleUser: null,
            userType: null
          })
        }))

    }else{
      console.log("Got null auth!")
      window.location.reload()
    }
  }
  render() {
    const fav = <Favicon url={[favicon]}/>
    let head = null
    let body = null
    let foot = null
    if (this.state.loading){
      // WHEEE
      body = <Wait/>
    }
    else if (this.state.isSignedIn) {
      // NOT LOADING, SIGNED IN, SHOW CORRECT PAGE (TA/STUDENT) AND HEADERs
      head = <MainNav
        guser={this.state.googleUser.profileObj}
        onSignOut={this.signout}/>
      if (this.state.userType === 'TA'){
        body = <Ta
          guser={this.state.googleUser.profileObj}/>
      } else {
        body = <Student
          guser={this.state.googleUser.profileObj}/>
      }
    }else{
      // NOT LOADING, NOT SIGNED IN, SHOW LOGIN PROMPT.
      body = <Login
        onResult={this.signin}
        clientId={config.CLIENT_ID}/>
    }

    return (
          <Container>
            {fav}
            {head}
            {body}
            {foot}
          </Container>
    )
  }
}

export default App;
