import { useEffect, useRef, useState } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { client, databases } from "../appwrite/appwriteConfig";
import { useParams } from "react-router-dom";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { RiSettingsFill } from "react-icons/ri";
import { SiJavascript } from "react-icons/si";
import Result from "./Result";
// import { basicSetup } from "codemirror";
// import { historyField } from "@codemirror/commands";
// import { defaultKeymap } from "@codemirror/commands";

// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const Editor = ({ code, setCode }) => {
  const [language, setLanguage] = useState(html());
  const extensions = [language];

  const [tabs, setTabs] = useState({
    htmlEditor: true,
    cssEditor: false,
    jsEditor: false,
  });
  function getCurrentEditorCode() {
    if (tabs.cssEditor) {
      return code.css;
    } else if (tabs.jsEditor) {
      return code.js;
    } else {
      return code.html;
    }
  }

  const params = useParams();
  const editor = useRef();

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: "dark",
    height: `${window.innerHeight}px`,
    width: `${window.innerWidth / 2 - 230}px`,
    value: getCurrentEditorCode(),

    onChange: (value, viewUpdate) => {
      if (tabs.cssEditor) {
        setCode({
          ...code,
          css: value,
        });
      } else if (tabs.jsEditor) {
        setCode({
          ...code,
          js: value,
        });
      } else if (tabs.htmlEditor) {
        setCode({
          ...code,
          html: value,
        });
      }
      localStorage.setItem("myValue", value);
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);
  // useEffect(() => {
  //   const unsubscribe = client.subscribe(
  //     `databases.6465138ecda20c9f16fc.collections.64665b3ccc38f6b475fd.documents.${params?.roomId}`,

  //     (response) => {
  //       console.log(response?.payload);
  //       // code.current = response?.payload?.code;
  //       setCode(response?.payload?.code);
  //       console.log(code);
  //     }
  //   );

  //   return () => {
  //     unsubscribe(() => {});
  //   };
  // }, [params?.roomId, code]);

  const srcCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${code.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
        ${code.html}
        </body>
        <style>${code.css}</style>
        <script>${code.js}</script>
        </html>
        `;
  const [src, setSrc] = useState(srcCode);
  function sendCodeToDatabase({ html, css, js, title }) {
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId,
      {
        src: JSON.stringify({ html, css, js, title }),
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

  function handleSaveAndRun() {
    setSrc(srcCode);
    sendCodeToDatabase(code);
  }
  function htmlEditorBtnHandler() {
    setTabs({
      htmlEditor: true,
      cssEditor: false,
      jsEditor: false,
    });
    setLanguage(html());
  }
  function cssEditorBtnHandler() {
    setTabs({
      htmlEditor: false,
      cssEditor: true,
      jsEditor: false,
    });
    setLanguage(css());
  }
  function jsEditorBtnHandler() {
    setTabs({
      htmlEditor: false,
      cssEditor: false,
      jsEditor: true,
    });
    setLanguage(javascript());
  }
  return (
    <div className=" w-full">
      <div className="border-b flex justify-between items-center border-gray-200 dark:border-gray-700 bg-slate-950 w-full">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <button
              className={`inline-flex items-center gap-1 p-4   rounded-t-lg  group ${
                tabs.htmlEditor
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent"
              }`}
              onClick={htmlEditorBtnHandler}
            >
              <AiFillHtml5 className="text-xl" />
              Html
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center gap-1 p-4  rounded-t-lg ${
                tabs.cssEditor
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent"
              }  group`}
              aria-current="page"
              onClick={cssEditorBtnHandler}
            >
              <FaCss3Alt className="text-xl" />
              Css
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center gap-1 p-4 rounded-t-lg ${
                tabs.jsEditor
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 border-b-2 border-transparent"
              } group`}
              onClick={jsEditorBtnHandler}
            >
              <SiJavascript className="text-xl" />
              Js
            </button>
          </li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleSaveAndRun}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save & Run
          </button>
          <RiSettingsFill className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex">
        <div className="" ref={editor} />
        <Result title={code.title} src={src} />
      </div>
    </div>
  );
};

export default Editor;
