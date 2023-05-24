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
const Editor = () => {
  const [save, setSave] = useState(false);
  const [language, setLanguage] = useState(html());
  const extensions = [language];
  const [code, setCode] = useState({
    html: "hello world\n\n\n\n",
    css: "*{\n   margin:0;\n   padding:0;\n}\n",
    js: `console.log("hello world");\n\n\n\n`,
  });
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
  console.log(params);
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
  console.log(code);
  function handleSaveAndRun() {
    if (!save) {
      setSave(true);
      // setTimeout(() => {
      // setSave(false);
      // }, 500);
    }
    else{
      setSave(false);
    }
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
      <div class="border-b flex justify-between items-center border-gray-200 dark:border-gray-700 bg-slate-950 w-full">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="mr-2">
            <button
              class={`inline-flex items-center gap-1 p-4   rounded-t-lg  group ${
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
          <li class="mr-2">
            <button
              class={`inline-flex items-center gap-1 p-4  rounded-t-lg ${
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
          <li class="mr-2">
            <button
              class={`inline-flex items-center gap-1 p-4 rounded-t-lg ${
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
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save & Run
          </button>
          <RiSettingsFill className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex">
        <div className="" ref={editor} />
        <Result
          css={code.css}
          html={code.html}
          js={code.js}
          title={"harsh"}
          save={save}
        />
      </div>
    </div>
  );
};

export default Editor;
