import React from "react";
import Contribution from "../contribution";

/**
 * This Component is used to preview Contributions beneath the thread
 * @param {contributions} contains the list of contributions that should be displayed
 * @returns
 */
const PreviewList = ({ contributions, handleRate }) => {
  return (
    <div className="postPreviews">
      {contributions.map((contribution) => {
        return (
          <Contribution
            key={contribution.id}
            contribution={contribution}
            isReplyButtonVisible={false}
            handleRate={handleRate}
            isEditable={false}
          ></Contribution>
        );
      })}
    </div>
  );
};

export default PreviewList;
