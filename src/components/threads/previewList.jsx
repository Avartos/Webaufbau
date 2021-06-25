import React from "react";
import Contribution from '../contribution';

const PreviewList = ({posts}) => {
  return (
      
    
      
      <div className="postPreviews">
        {posts.map((post) => {
          return <Contribution key={post.id}></Contribution>
        })}
      </div>    
  );
};

export default PreviewList;
