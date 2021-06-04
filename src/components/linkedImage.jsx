import React, {Component} from "react";
import {Link} from 'react-router-dom';


export default class LinkedImage extends Component {

    //state = {};

    render() {
        return(
            <Link to={this.props.href} >
                <img src={this.props.url} alt={this.props.alt}/>
            </Link>
        );
    }
}
