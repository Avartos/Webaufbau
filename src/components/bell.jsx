import React, {Component} from "react";


export default class Bell extends Component {

    //state = {};

    render() {
        return(
            <div className="wrapper-bell">
                <img src={this.props.url} alt={this.props.alt}/>
            </div>
        );
    }
}
