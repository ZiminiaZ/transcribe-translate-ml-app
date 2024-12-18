import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
  const [tab, setTab] = useState("transcription");
  const { output, finished } = props;
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select Language");

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("downloading");
          break;
        case "progress":
          console.log("loading");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("Done");
          break;
      }
    };
    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription" ? output.map((val) => val.text) : translation || "No translation";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Scribertube_${new Date().toDateString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select Language") {
      return;
    }
    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_language: "eng_Latin",
      tgt_lang: toLanguage,
    });
  }

  return (
    <main className="flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-pink-400 bold">Transcription</span>
      </h1>
      <div className="flex items-center gap-2 mx-auto bg-white rounded-full overflow-hidden specialBtn">
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-1 font-medium duration-200" +
            (tab === "transcription"
              ? " bg-pink-400 text-white hover:-translate-x-2"
              : " hover:text-pink-400 text-pink-600 ")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-1 font-medium duration-200" +
            (tab === "translation"
              ? " bg-pink-400 text-white hover:translate-x-2"
              : " hover:text-pink-400 text-pink-600")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {(!finished || translating) && (
          <div className="grid place-items-center">
            <i className="fa-solid fa-spinner animate-spin"></i>
          </div>
        )}
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            toLanguage={toLanguage}
            setToLanguage={setToLanguage}
            translating={translating}
            setTranslating={setTranslating}
            textElement={textElement}
            setTranslation={setTranslation}
            generateTranslation={generateTranslation}
          />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          onClick={handleCopy}
          title="Copy"
          className="bg-white rounded-full px-3 aspect-square grid place-items-center text-pink-400 hover:bg-black hover:-translate-y-1 duration-200"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="bg-white rounded-full px-3 aspect-square grid place-items-center text-pink-400 hover:bg-black hover:-translate-y-1 duration-200"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}

// *4:00*
