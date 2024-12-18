import React from 'react'

export default function () {
  return (
    <>
      <header className="flex items-center justify-between gap-4 p-4">
        <a href="/">
          <h1 className="font-medium">
            Sciber<span className="text-pink-400 bold">Tube</span>
          </h1>
        </a>
        <a href="/" className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-pink-400  hover:bg-pink-400 duration-500 ease-in-out hover:text-white text-sm">
          <p>New</p>
          <i className="fa fa-solid fa-plus"></i>
        </a>
      </header>
    </>
  );
}

