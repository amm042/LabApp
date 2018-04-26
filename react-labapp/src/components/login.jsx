import React, { Component } from 'react'
//import GoogleLogin from 'react-google-login';
import {Button} from 'reactstrap'
import logo from '../img/CompSciLogo.png'

import {withRouter} from 'react-router'

import './login.css'

class Login extends Component{
  constructor(props){
    super(props)
    this.signin = this.signin.bind(this)
    this.state = {
      disabled: true,
      courses: { // TODO get this from backend.
        'CSCI203':['SP2018','FA2018'],
        'CSCI204': ['SP2018']
      }
    }
  }
  componentDidMount(){
    const params = {
      client_id: this.props.clientId,
      cookie_policy: 'single_host_origin',
      fetch_basic_profile: true,
      ux_mode: 'popup',
      access_type: 'online'
    }
    window.gapi.load('auth2', () => {

      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init(params).then(
          res => {
            if (res.isSignedIn.get()) {
              this.props.onResult(res.currentUser.get())
            }else{
              this.setState({disabled:false})
            }
          },
          err => {
            this.props.onResult(err)
            this.setState({disabled:false})
          }
        )
      }else{
        console.log("ERR: failed to load auth2.")
        window.location.reload()
      }

    })
  }
  signin(){
    const auth2 = window.gapi.auth2.getAuthInstance()

    if (auth2){
      auth2.signIn().then(res =>
        this.props.onResult(res),
        err => this.props.onResult(err))
    }else{
      console.log("ERR: failed to get auth2.")
      window.location.reload()
    }
  }
  render(){
      if (this.state.disabled){
        return null
      }
      return (
        <div className="text-center" id="signin-container">
          <img className="img-fluid" src={logo} alt="Computer Science"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

          <Button
            color='primary'
            block
            className='btn-lg'
            onClick={this.signin}>
            Sign In
          </Button>
        </div>
      )
  }
}

export default withRouter(Login)
