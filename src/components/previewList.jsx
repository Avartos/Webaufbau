import React from "react";

const PreviewList = ({posts}) => {
  return (
      <div className="postPreviews">
        {posts.map((post) => {
          //TODO: Reference to Post Component here
          return <p key={post.id}>Tehehest</p>;
        })}
      </div>    
  );
};

export default PreviewList;
