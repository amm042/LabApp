import React, { Component } from 'react';
import DefaultUser from '../img/DefaultUser.png';
import { Image } from 'react-bootstrap';

export default class UserCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.user.prefName,
            email: props.user.email,
            icon: props.user.icon || DefaultUser,
            onClick: props.onClick,
            onDoubleClick: props.onDoubleClick
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.user.prefName,
            email: nextProps.user.email,
            icon: nextProps.user.icon || DefaultUser,
            onClick: nextProps.onClick,
            onDoubleClick: nextProps.onDoubleClick
        })
    }

    render() {
        return (
            <div className="UserCard" onClick={this.state.onClick} onDoubleClick={this.state.onDoubleClick}>
                <Image src={ `https://myapi.bucknell.edu/framework/media/person/${this.state.email.replace('@bucknell.edu', '')}?access_token=70c746e5-0a28-4c56-a4b7-84ade9d05940&width=128&height=128` } alt={ this.state.prefName } circle />
                <b>{this.state.name}</b><br/>
                {this.state.email}
            </div>
        );
    }

}