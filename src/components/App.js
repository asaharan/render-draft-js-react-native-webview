import React, { useState, useEffect } from "react";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "katex/dist/katex.min.css";
import TeXBlock from "./TeXBlock";
import ImageBlock from "./ImageBlock";

const createEditorState = rawContent => {
  let editorState = EditorState.createEmpty();
  if (rawContent) {
    let parsedRawContent = rawContent;
    if (typeof parsedRawContent !== "object") {
      try {
        parsedRawContent = JSON.parse(rawContent);
      } catch (e) {
        parsedRawContent = {};
      }
    }
    const sanitizedRawContent = {
      entityMap: {},
      blocks: [],
      ...parsedRawContent
    };
    sanitizedRawContent.blocks = sanitizedRawContent.blocks.filter(b => {
      return true;
      return !(b.type === "unstyled" && !b.text);
    });
    editorState = EditorState.createWithContent(
      convertFromRaw(parsedRawContent)
    );
  }
  return editorState;
};

const App = () => {
  const [editorState, setEditorState] = useState(null);
  const onFetchedEditorContent = event => {
    setEditorState(createEditorState(event.detail.rawContent));
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("fetched-editor-content", onFetchedEditorContent);
    }
    if (!editorState && window && window.rawContent) {
      setEditorState(createEditorState(window.rawContent));
    }

    return () => {
      window &&
        window.removeEventListener(
          "fetched-editor-content",
          onFetchedEditorContent
        );
    };
  }, [onFetchedEditorContent]);
  useEffect(() => {
    const event = new Event("on-editor-render");
    window.dispatchEvent(event);
  }, [editorState]);
  return (
    <div>
      {editorState ? (
        <Editor
          blockRendererFn={block => blockRendererFn(block, editorState)}
          customStyleMap={customStyleMap}
          readOnly
          editorState={editorState}
        />
      ) : null}
    </div>
  );
};
const blockRendererFn = (block, editorState) => {
  if (block.getType() === "atomic") {
    const contentState = editorState.getCurrentContent();
    const type = contentState.getEntity(block.getEntityAt(0)).getType();
    if (type === "TOKEN") {
      return {
        component: TeXBlock,
        editable: false
      };
    }

    if (type === "IMAGE") {
      return {
        component: ImageBlock,
        editable: false
      };
    }
  }
  return null;
};

const customStyleMap = {
  super: { verticalAlign: "super", fontSize: ".8rem" },
  sub: { verticalAlign: "sub", fontSize: "0.8rem" },
  equation: { marginLeft: "1px", marginRight: "1px", fontStyle: "italic" }
};

export default App;
