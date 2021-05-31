import React, {Component} from "react";


export default class List extends Component {

    //state = {};

    render() {
        return(
            <div className="wrapper-list">

                <ul>{this.props.className}
                    <li>{this.props.list[0].forum}
                        <ul>
                            <li>{this.props.list[0].threads[0]}</li>
                            <li>{this.props.list[0].threads[1]}</li>
                        </ul>
                    </li>
                    <li>{this.props.list[1].forum}
                        <ul>
                            <li>{this.props.list[1].threads[0]}</li>
                            <li>{this.props.list[1].threads[1]}</li>
                        </ul>
                    </li>
                    <li>{this.props.list[2].forum}
                        <ul>
                            <li>{this.props.list[2].threads[0]}</li>
                            <li>{this.props.list[2].threads[1]}</li>
                        </ul>
                    </li>
                    <li>{this.props.list[3].forum}
                        <ul>
                            <li>{this.props.list[3].threads[0]}</li>
                            <li>{this.props.list[3].threads[1]}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}
