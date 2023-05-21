import { useEffect, useRef, useState } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { material } from "@uiw/codemirror-theme-material";
import { client, databases } from "../appwrite/appwriteConfig";
import { useParams } from "react-router-dom";

// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [javascript({ jsx: true }), html(), css(), material];

const Editor = () => {
  const [code, setCode] = useState("console.log('hello world!');\n\n\n");
  // const code = useRef("console.log('hello world!');\n\n\n");

  const params = useParams();
  console.log(params);
  const editor = useRef();
  useEffect(() => {
    async function updateCode() {
      const promise = databases.updateDocument(
        "6465138ecda20c9f16fc",
        "64665b3ccc38f6b475fd",
        params?.roomId,
        {
          code: code,
        }
      );
      promise.then(
        function (response) {
          console.log(response);
        },
        function (err) {
          console.log(err);
        }
      );
    }
    const timeout = setTimeout(() => {
      updateCode();
    }, 500);
    return () => clearTimeout(timeout);
  }, [code, params?.roomId]);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: material,
    height: `${window.screen.height / 2}px`,
    width: `${window.screen.width - 230}px`,
    value: code,
    onChange: (value, viewUpdate) => {
      console.log("changed");
      setCode(value);
    },
  });
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.6465138ecda20c9f16fc.collections.64665b3ccc38f6b475fd.documents.${params?.roomId}`,

      (response) => {
        console.log(response?.payload);
        // code.current = response?.payload?.code;
        setCode(response?.payload?.code);
        console.log(code);
      }
    );

    return () => {
      unsubscribe(() => {});
    };
  }, [params?.roomId, code]);
  console.log(code);

  return <div className="" ref={editor} />;
};

export default Editor;
