import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
function Add() {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [confpassword, setconfpassword] = useState("");
  let [error, seterror] = useState("");
  let notify = () =>
    toast.success("User Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  let baseurl = "http://localhost:8000";

  let notifyerror = (e) =>
    toast.error(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const handleadd = async () => {
    if (!email) {
      seterror("Email is requird");
      notifyerror(error);
      return;
    }
    if (!password) {
      seterror("Password is requird");
      notifyerror(error);

      return;
    }
    if (!(password == confpassword)) {
      seterror("Password Dosnt match");
      notifyerror(error);

      return;
    }
    if (email && confpassword && password) {
      seterror("");
      let data = {
        password: password,
        email: email,
        confpassword: confpassword,
      };
      axios
        .post(`${baseurl}/regester`, data)
        .then((res) => {
          if (res.status == 201) {
            setemail("");
            setpassword("");
            setconfpassword("");
          }
          notify();
        })
        .catch((err) => {
          seterror("Some erroe occurd in database");
          notifyerror(error);
        });
    }
  };



 
  return (
    <>
      <div className="m-auto flex gap-3 flex-wrap mt-20 justify-center rounded flex-col bg-gray-700 p-4 place-content-center content-center">
        <ToastContainer />
        <input
          type="email"
          placeholder="Email"
          name=""
          id=""
          required
          className="outline w-100  p-2 rounded "
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          name=""
          required
          value={password}
          id=""
          className="outline p-2 rounded "
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          required
          name=""
          id=""
          value={confpassword}
          className="outline p-2 rounded "
          onChange={(e) => {
            setconfpassword(e.target.value);
          }}
        />
        <button
          className="border-black active:bg-green-700 hover:bg-green-700 cursor-pointer px-4 py-1 bg-green-500 rounded text-black  shadow-lg shadow-green-500/50"
          onClick={handleadd}
        >
          Add User
        </button>
      </div>
    </>
  );
}
export default Add;
