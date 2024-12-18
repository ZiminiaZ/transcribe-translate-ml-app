import React, { useRef, useEffect } from "react";

export default function FileDisplay(props) {
  const { file, audioStream, handleResetAudio, handleFormSubmission } = props;
  const audioRef = useRef();

  useEffect(() => {
    if (!file && !audioStream) {
      return;
    }
    if (file) {
      console.log("HERE FILE", file);
      audioRef.current.src = URL.createObjectURL(file);
    } else {
      console.log("HERE AUDIO", audioStream);
      audioRef.current.src = URL.createObjectURL(audioStream);
    }
  }, [audioStream, file]);

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 sm:w-96 w-fit max-w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-pink-400 bold ">File</span>
      </h1>
      <div
        className="mx-auto flex flex-col text-left my-4
      "
      >
        <h3 className="font-semibold">Name</h3>
        <p className="truncate">{file ? file?.name : `Custom Audio`}</p>
      </div>
      <div className="flex flex-col mb-2">
        <audio ref={audioRef} className="w-full" controls>
          Your browser doesnt support audio element
        </audio>
      </div>
      <div className="flex items-center rounded px-4 py-2 justify-between gap-20">
        <button
          onClick={handleResetAudio}
          className="text-slate-400 hover:bg-pink-400 rounded-full hover:text-white hover:-translate-y-2 duration-200 p-3 flex items-center gap-2 group"
        >
          <p>Reset</p>
          <i className="fa-solid fa-rotate-right group-hover:animate-spin"></i>
        </button>
        <button
          onClick={handleFormSubmission}
          className="text-pink-400 specialBtn px-3 p-2 rounded-lg hover:-translate-y-2 hover:bg-pink-400 hover:text-white flex items-center gap-2 font-medium"
        >
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}

// *3:50
