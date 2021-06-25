import React from 'react'


function DescriptionThread({thread}) {

    return (
        <div className="descriptionThread">
            <p className="threadName">{thread.title}</p>
            <p className="threadDescription">{thread.description}</p>
            <table>
                <tbody>
                    <tr>
                        <td>Erstellt am:</td>
                        <td>{thread.createdAt}</td>
                    </tr>
                    <tr>
                        <td>Anzahl Beiträge:</td>
                        <td>{thread.contributionCount}</td>
                    </tr>
                    <tr>
                        <td>Letzter Eintrag von:</td>
                        <td>{thread.lastContribution.from}</td>
                    </tr>
                    <tr>
                        <td>Letzter Beitrag am:</td>
                        <td>{thread.lastContribution.createdAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DescriptionThread;