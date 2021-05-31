import React, {Component} from "react";


export default class SearchBar extends Component {

    //state = {};

    render() {
        return(
            <form className="searchBar">
                <input type="text" placeholder="Suche..."/>
                <button className="submit">
                    <img src={this.props.url} alt={this.props.alt}/>
                </button>
            </form>
        );
    }
}
