import React, { Component } from 'react';
import DefaultUser from '../img/DefaultUser.png';
import { Image } from 'react-bootstrap';

export default class UserCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.user.prefName,
            email: props.user.email,
            icon: props.user.icon || DefaultUser
        }

        this.onClick = props.onClick;
    }



    render() {
        return (
            <div className="UserCard" onClick={this.onClick}>
                <Image src={ this.state.icon } alt={ this.state.prefName } circle />
                <b>{this.state.name}</b><br/>
                {this.state.email}
            </div>
        );
    }

}