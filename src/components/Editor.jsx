import { useEffect, useRef, useState } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { databases } from "../appwrite/appwriteConfig";
import { useParams } from "react-router-dom";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { RiSettingsFill } from "react-icons/ri";
import { SiJavascript } from "react-icons/si";
import Result from "./Result";

const Editor = ({
  code,
  setCode,
  projectUser,
  currentUser,
  tailwind,
  setTailwind,
}) => {
  const [language, setLanguage] = useState(html());
  const extensions = [language];
  const [show, setShow] = useState(false);

  const [tabs, setTabs] = useState({
    htmlEditor: true,
    cssEditor: false,
    jsEditor: false,
  });
  function getCurrentEditorCode() {
    if (tabs?.cssEditor) {
      return code?.css;
    } else if (tabs?.jsEditor) {
      return code?.js;
    } else if (tabs?.htmlEditor) {
      return code?.html;
    }
  }

  const params = useParams();
  const editor = useRef();

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: localStorage.getItem('theme'),
    height: `${window.innerHeight - 64}px`,
    width: `${window.innerWidth / 2 - 230}px`,
    value: getCurrentEditorCode(),

    onChange: (value, viewUpdate) => {
      if (tabs.cssEditor) {
        setCode({
          html: code.html,
          js: code.js,
          css: value,
        });
      } else if (tabs.jsEditor) {
        setCode({
          html: code.html,
          css: code.css,
          js: value,
        });
      } else if (tabs.htmlEditor) {
        setCode({
          js: code.js,
          css: code.css,
          html: value,
        });
      }
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  const srcCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${code?.title}</title>
        ${tailwind}
        </head>
        <body>
        ${code?.html}
        </body>
        <style>${code?.css}</style>
        <script>${code?.js}</script>
        </html>
        `;
  const [src, setSrc] = useState(srcCode);
  function sendCodeToDatabase(code) {
    if (currentUser !== projectUser) return;
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId,
      {
        src: JSON.stringify({
          html: code?.html,
          css: code?.css,
          js: code?.js,
          title: code?.title,
        }),
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
    <div className=" w-full relative">
      <div className="border-b sticky z-50 h-16 top-0 left-0 sm:flex justify-between items-center border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-950 w-full hidden">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <button
              className={`inline-flex items-center gap-1 p-4   rounded-t-lg  group ${
                tabs.htmlEditor
                  ? "text-green-600 border-b-2 border-green-600 dark:text-blue-500 dark:border-blue-500"
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
                  ? "text-green-600 border-b-2 border-green-600 dark:text-blue-500 dark:border-blue-500"
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
                  ? "text-green-600 border-b-2 border-green-600 dark:text-blue-500 dark:border-blue-500"
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
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save & Run
          </button>
          <div>
            <RiSettingsFill
              className="text-slate-950 mr-4 dark:text-white text-2xl"
              onClick={() => setShow(show ? false : true)}
            />
            <div
              className={`${
                show ? "" : "hidden"
              } absolute top-8 p-4 border  right-0 translate-y-[10%] z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded`}
              id="dropdown"
              onMouseLeave={() => setShow(false)}
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={() => {
                    tailwind ===
                    '<script src="https://cdn.tailwindcss.com"></script>'
                      ? setTailwind("")
                      : setTailwind(
                          '<script src="https://cdn.tailwindcss.com"></script>'
                        );
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Turn off Tailwind
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="hidden sm:block" ref={editor} />
        <Result
          title={code?.title}
          src={src}
          projectId={params?.projectId}
          tailwind={tailwind}
        />
      </div>
    </div>
  );
};

export default Editor;
