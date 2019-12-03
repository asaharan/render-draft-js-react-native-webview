import React, { useState, useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onFetchedEditorContent = () => {
    console.log("onFetchedEditorState");
  };
  useEffect(() => {
    window.addEventListener("fetched-editor-content", onFetchedEditorContent);
    return () => {
      window.removeEventListener(
        "fetched-editor-content",
        onFetchedEditorContent
      );
    };
  }, []);
  return (
    <div>
      <div>Hello World!</div>
      <Editor readOnly editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default App;
