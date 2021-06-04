import React, {Component} from "react";


export default class Profile extends Component {

    //state = {};

    render() {
        return(
            <div className="wrapper-profile">
                <img src={this.props.url} alt={this.props.alt}/>
            </div>
        );
    }
}
