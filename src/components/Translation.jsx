import React from "react";
import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    textElement,
    toLanguage,
    setToLanguage,
    translating,
    generateTranslation,
  } = props;
  return (
    <>
      {textElement && !translating && <p>{textElement}</p>}

      <div className="flex flex-col gap-2 max-w-[400px] mx-auto">
        {!translating && (
          <div className="flex items-stretch gap-2 p-2 rounded">
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm font-medium text-slate-500 gap-1 mr-auto">
                To language
              </p>
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                className="flex-1 outline-none bg-white focus:outline-none border-transparent hover:border-pink-300 duration-200 p-2 rounded"
              >
                <option value={"Select Language"}>Select Language</option>
                {Object.entries(LANGUAGES).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={generateTranslation}
                className="speicalBtn px-3 py-2 rounded-lg text-pink-400 hover:text-pink-600 hover:bg-black hover:translate-x-2 duration-200"
              >
                Translate
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

//* 4:50
