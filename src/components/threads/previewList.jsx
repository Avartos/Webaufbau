import React from "react";
import Contribution from '../contribution';

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
