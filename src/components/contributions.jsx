import React, { Component } from 'react';

export default class Contributions extends Component {
    // state = {}
    render() {
        return (
            <React.Fragment>
                <div className="contributionList">
                    <p className="ThreadName"> Thread Name </p>
        
                    <div className="descriptionThread">
                        <p className="descriptionText"> Ich bin die Beschreibung des Threads! </p>
                    </div>
        
                    <div className="createContribution">
                        <button className="addContribution" onclick="document.getElementById('answerContribution').style.display='block'"> + </button>
                    </div>
        
                    <div className="answerContribution" id="answerContribution" style={{display:'none'}}>
                        <textarea className="answer">Ich bin eine Antwort! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At ve </textarea>
                        <button className="answerButtons"><i className="fas fa-paperclip"></i> Anhängen </button>
                        <button className="answerButtons" type="submit"><i className="fas fa-paper-plane"></i> Senden </button>
                        <button className="deleteAnswer"><i className="fas fa-trash-alt"></i> Verwerfen </button>
                    </div>
                    
                    <div className="contribution1">
                        <p className="contributorSquid"> From: Squid666 </p>
                        <p className="conText"> Ich bin ein Beitrag! Yay! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dol</p> 
                        <button className="contributionButtons"><i className="fas fa-reply"></i> Antworten </button>
                        <button className="contributionButtons"><i className="fas fa-reply"></i> Bearbeiten </button>
                        <button className="contributionButtons"><i className="fas fa-thumbs-up"></i> Like </button>
                        <button className="contributionButtons"><i className="fas fa-thumbs-down"></i> Dislike </button>
                    </div>
        
                    <div className="contribution2">
                        <p className="contributorSquid"> From: Squid666 </p>
                        <p className="conText"> Ich bin ein Beitrag! Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p> 
                        <button className="contributionButtons"><i className="fas fa-reply"></i> Antworten </button>
                        <button className="contributionButtons"><i className="fas fa-thumbs-up"></i> Like </button>
                        <button className="contributionButtons"><i className="fas fa-thumbs-down"></i> Dislike </button>
                        <button className="contributionButtons"><i className="fas fa-reply"></i> Bearbeiten </button>
                    </div>
                </div>  
            </React.Fragment>
        )
    }
}