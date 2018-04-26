import React, { Component } from 'react'


class Student extends Component{
  /**
   * Student route assumes the user has logged in with the backend and
   * the server session is started.
   *
   * Props:
   *  guser - the googleuser profile object containing
   *    googleId, imageUrl, email, name, givenName, familyName
   */
  render(){
    return <h1>student</h1>
  }
}

export default Student
