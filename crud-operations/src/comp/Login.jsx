import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { passwordslicer, timesplit } from "./Helper";
function Login() {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [error, seterror] = useState("");
  let [login, setlogin] = useState(false);
  let [logindata, setlogindata] = useState({});
  let navigate=useNavigate();
  let notify = (e) =>
    toast.success(e, {
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
    seterror("");
    let data = {
      password: password,
      email: email,
    };
    axios
      .post(`${baseurl}/login`, data,{withCredentials:true})
      .then((res) => {
        console.log(res);
        if (res.data.error == false) {
          setlogin(true);
          setlogindata(res);
          setemail("");
          setpassword("");
          notify(res.data.status);
        } else {
          console.log(res);
          notifyerror(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        seterror("Some erroe occurd in database");
        notifyerror(error);
      });
  };

  const handlelogout = () => {
    axios
      .post(`${baseurl}/logout`)
      .then((res) => {
        console.log(res);
        navigate('/list')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(logindata);
  }, [logindata]);

  return (
    <>
      {/* <ToastContainer className="text-white" /> */}

      {!login ? (
        <div className="m-auto flex gap-3 flex-wrap mt-20 justify-center rounded flex-col bg-gray-700 p-4 place-content-center content-center">
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

          <button
            className="border-black hover:bg-purple-700 cursor-pointer px-4 py-1 bg-purple-500 rounded text-black shadow-lg shadow-purple-500/50"
            onClick={handleadd}
          >
            Login
          </button>
        </div>
      ) : (
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

          <button
            onClick={handlelogout}
            className="border-black hover:bg-red-700 cursor-pointer w-40 px-4 py-1 bg-red-500 rounded text-black shadow-lg shadow-red-500/50"
          >
            Logout
          </button>
        </div>
      )}

      <ToastContainer className="text-white" />
    </>
  );
}
export default Login;
