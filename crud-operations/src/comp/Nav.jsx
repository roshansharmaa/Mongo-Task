import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="flex justify-evenly w-full max-w-5xl m-auto py-2 bg-zinc-800 rounded text-xl">
      <Link to="/list">
          <button className="border-black hover:bg-yellow-700 cursor-pointer px-4 py-1 bg-yellow-500 rounded text-black  shadow-lg shadow-yellow-500/50">
            List
          </button>
        </Link>

      <Link to="/add">

        <button className="border-black hover:bg-green-700 cursor-pointer px-4 py-1 bg-green-500 rounded text-black  shadow-lg shadow-green-500/50">
          Add
        </button>
        </Link>
        <Link to="/update">
        <button className="border-black hover:bg-blue-700 cursor-pointer px-4 py-1 bg-blue-500 rounded text-black  shadow-lg shadow-blue-500/50">
          Update
        </button>
        </Link>
        <Link to="/delete">
        <button className="border-black hover:bg-red-700 cursor-pointer px-4 py-1 bg-red-500 rounded text-black shadow-lg shadow-red-500/50">
          Delete
        </button>
        </Link>
      </div>
    </>
  );
}

export default Nav;
