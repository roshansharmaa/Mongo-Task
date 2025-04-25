import React from "react";

function Sucess() {
  return (
    <>
      <div className="bg-gray-700 m-auto mt-4 rounded flex justify-between flex-col p-2 h-50 w-100">
        <h1 className="text-2xl text-purple-500 ">User Data</h1>

        <p>A/c Details: {timesplit(logindata.data.alredyuser.createdAt)}</p>
        <p>Email: {logindata.data.alredyuser.email}</p>
        <p>
          Password:{" "}
          {passwordslicer(logindata.data.alredyuser.password) + "...."}
        </p>
        <p>
          Update at:{" "}
          {logindata.data.alredyuser.updatedAt !==
          logindata.data.alredyuser.createdAt
            ? timesplit(logindata.data.alredyuser.updatedAt)
            : "N/A"}
        </p>
      </div>
    </>
  );
}

export default Sucess;
