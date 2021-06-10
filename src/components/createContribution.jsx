import React, { Component } from 'react'

class CreateContribution extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createContribution: props.createContribution
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="createContribution">
                        <button className="addContribution" onclick="document.getElementById('answerContribution').style.display='block'"> + </button>
        
                    <div className="answerContribution" id="answerContribution">
                        <textarea className="answer">{this.state.createContribution.answer}</textarea>
                        <button className="answerButtons"><i className="fas fa-paperclip"></i> Anhängen </button>
                        <button className="answerButtons" type="submit"><i className="fas fa-paper-plane"></i> Senden </button>
                        <button className="deleteAnswer"><i className="fas fa-trash-alt"></i> Verwerfen </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CreateContribution;