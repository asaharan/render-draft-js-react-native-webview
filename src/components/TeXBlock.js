import React, { useRef, useEffect } from "react";
import katex from "katex";

const TeXBlock = props => {
  const ref = useRef();
  const handleUpdate = () => {
    return setTimeout(() => {
      let content = props.contentState
        .getEntity(props.block.getEntityAt(0))
        .getData()["content"];
      console.log(content);
      katex.render(content, ref.current, { displayMode: true });
    }, 0);
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = "";
    }
    console.log("useeffect");
    const timeoutId = handleUpdate();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return <div ref={ref} />;
};

export default TeXBlock;
