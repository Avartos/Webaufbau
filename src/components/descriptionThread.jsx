import React from 'react'




function DescriptionThread() {

    function ThreadName(props) {
        return <p>{props.threadName}</p>
    }
    
    function CreatedAtStatistic(props) {
        return <p>{props.createdAtStatistic}</p>
    }

    function NumberOfContributions(props) {
        return <p>{props.numberOfContributions}</p>
    }
    
    function LastContributiorSquid(props) {
        return <p>{props.lastContributorSquid}</p>
    }
    
    function DateOfLastContribution(props) {
        return <p>{props.dateOfLastContribution}</p>
    }
    
    
    
    return (
        <div className="descriptionThread">
            <p className="threadName"> <ThreadName threadName="Katzentatzen"/> </p>
            <p className="threadStatistics"> Erstellt am: <CreatedAtStatistic createdAtStatistic="02.05.2012"/></p>
            <p className="threadStatistics"> Anzahl Beiträge: <NumberOfContributions numberOfContributions="61"/> </p>
            <p className="threadStatistics"> Letzter Eintrag von: <LastContributiorSquid lastContributiorSquid="Squid404"/> </p>
            <p className="threadStatistics"> Letzter Beitrag am: <DateOfLastContribution dateOfLastContribution="03.05.2013"/> </p>
        </div>
    )
}

export default DescriptionThread;