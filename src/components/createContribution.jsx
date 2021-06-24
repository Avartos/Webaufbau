import React from 'react'

function CreateContribution() {

    function Answer(props) {
        return <textarea>{props.answer}</textarea>
    }

    return (

        
        <div className="createContribution">
            <button className="addContribution" onclick="document.getElementById('answerContribution').style.display='block'"> + </button>

            <div className="answerContribution" id="answerContribution">
                <textarea className="answer"><Answer answer="Ich bin eine Antwort looooool"/></textarea>
                <button className="answerButtons"><i className="fas fa-paperclip"></i> Anhängen </button>
                <button className="answerButtons" type="submit"><i className="fas fa-paper-plane"></i> Senden </button>
                <button className="deleteAnswer"><i className="fas fa-trash-alt"></i> Verwerfen </button>
            </div>
        </div>
    )
}

export default CreateContribution;