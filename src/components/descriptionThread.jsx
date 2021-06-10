import React, { Component } from 'react'

class DescriptionThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            descriptionThread: props.descriptionThread
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="descriptionThread">
                        <p className="descriptionText"> {this.state.descriptionThread.threadName} </p>
                        <p className="threadStatistics"> Erstellt am: {this.state.descriptionThread.createdOn} </p>
                        <p className="threadStatistics"> Anzahl Beiträge: {this.state.descriptionThread.numberOfContributions} </p>
                        <p className="threadStatistics"> Letzter Eintrag von: {this.state.descriptionThread.squidname} </p>
                        <p className="threadStatistics"> Letzter Beitrag am: {this.state.descriptionThread.lastContributionOn} </p>
                    </div>
            </React.Fragment>
        )
    }
}

export default DescriptionThread;