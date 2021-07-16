import React from "react";

/**
 * this component includes the statistics of the Thread
 */
function DescriptionThread({ thread }) {
  return (
    <div className="descriptionThread">
      <div className="header">
        <p className="title">{thread.title}</p>
      </div>
      <p className="body">{thread.description}</p>
      <div className="statistics">
        <table>
          <tbody>
            <tr>
              <td>Erstellt am:</td>
              <td className="highlighted">{thread.createdAt}</td>
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
              <td className="highlighted">
                {thread.lastContribution.createdAt}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DescriptionThread;
