import React, { usestate, useEffect, useRef, useState } from "react";

export default function HomePage(props) {
  const { setFile, setAudioStream } = props;
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;

    try {
      tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (error) {
      console.log(error.message);
      return;
    }
    setRecordingStatus("recording");

    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size === 0) {
        return;
      }
      if (typeof event.data === "undefined") {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");

    console.log("stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const showClock = setInterval(() => {
      setDuration((c) => c + 1);
    }, 1000);

    return () => clearInterval(showClock);
  });

  return (
    <>
      <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center">
        <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
          Scriber<span className="text-pink-400 font-bold ">Tube</span>
        </h1>
        <h3 className="font-medium md:text-lg">
          Record <span className="text-pink-400">&rarr;</span> Transcribe
          <span className="text-pink-400">&rarr;</span>Translate
        </h3>
        <button
          onClick={
            recordingStatus === "recording" ? stopRecording : startRecording
          }
          className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn rounded-xl px-4 py-2"
        >
          <p className="text-pink-400">
            {recordingStatus === "inactive" ? "Record" : `Stop Recording`}
          </p>
          <div className="flex items-center gap-2">
            {duration !== 0 && <p className="text-sm">{duration}s</p>}
            <i
              className={
                "fa-solid duration-200 fa-microphone" +
                (recordingStatus === "recording" ? " text-rose-400 animate-pulse" : "")
              }
            ></i>
          </div>
        </button>
        <p className="text-base">
          Or{" "}
          <label className="text-pink-400 cursor-pointer hover:text-pink-600 duration-200">
            Upload{" "}
            <input
              onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3,wave"
            />
          </label>
          a mp3 file
        </p>
        <p className="italic text-slate-400">Free now, free forever</p>
      </main>
    </>
  );
}

// *3:36
