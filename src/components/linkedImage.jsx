import React, {Component} from "react";


export default class LinkedImage extends Component {

    //state = {};

    render() {
        return(
            <a href={this.props.href}>
                <img src={this.props.url} alt={this.props.alt}/>
            </a>
        );
    }
}
