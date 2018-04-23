import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,
  Collapse, NavbarToggler } from 'reactstrap';

// reactstrap controlled dropdowns are buggy this is a work around
import {UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem} from 'reactstrap'

//
// import GoogleLogout from 'react-google-login';

import appico from '../img/CSLogo.png'
import "./nav.css"

class MainNav extends Component {
  constructor(props){
    super(props)
    this.state={
      menuOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle(){
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render(){

    return (
      <Navbar color="light" light expand="sm">
        <NavbarBrand href="/" className="p-0 m-0">
          <img src={appico} id="brandimg" alt="LabApp"/>
          <span className="p-2">LabApp</span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />

        <Collapse className="ml-auto" isOpen={this.state.menuOpen} navbar>
          <Nav className="ml-auto" navbar>
          {/*<NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>*/}
            <NavItem>
              <img className="p-2 nav-userimg" src={this.props.guser.imageUrl} alt="userimg"/>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className="p-2">{this.props.guser.name}</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="#">My Grades</NavLink>
                </DropdownItem>
                <DropdownItem divider />

                <DropdownItem>
                    <NavLink onClick={this.props.onSignOut} href="#">Logout</NavLink>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
   )}
}
export default MainNav;
