import React, { Component } from 'react'

class Contribution extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contribution: props.contribution
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="contribution">
                    <p className="contributorSquid"> From: {this.state.contribution.squidname}</p>
                    <p className="conText">{this.state.contribution.text}</p>
                    <button className="contributionButtons"><i className="fas fa-reply"></i> Antworten </button>
                    <button className="contributionButtons"><i className="fas fa-reply"></i> Bearbeiten </button>
                    <button className="contributionButtons"><i className="fas fa-thumbs-up"></i> Like </button>
                    <button className="contributionButtons"><i className="fas fa-thumbs-down"></i> Dislike </button>
                </div>
            </React.Fragment>
        )
    }
}

export default Contribution;