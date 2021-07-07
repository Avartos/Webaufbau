import React from "react";
import Contribution from '../contribution';

/**
 * This Component is used to preview Contributions beneath the thread 
 * @param {contributions} contains the list of contributions that should be displayed
 * @returns 
 */
const PreviewList = ({contributions}) => {
  return (
      <div className="postPreviews">
        {contributions.map((contribution) => {
          console.log('test')
          return <Contribution key={contribution.id} contribution={{id:0, contributionText: contribution.content, contributorSquid: contribution.creatorUserName}}></Contribution>
        })}
      </div>    
  );
};

export default PreviewList;
