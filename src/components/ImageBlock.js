import React from "react";

const ImageBlock = props => {
  const url = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData()["url"];
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {url ? (
          <img alt="" style={{ maxWidth: "100%" }} src={url} />
        ) : (
          <span>No image uploaded</span>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
