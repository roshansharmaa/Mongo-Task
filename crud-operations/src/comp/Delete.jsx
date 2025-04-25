import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { passwordslicer } from "./Helper";

function Delete() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let baseurl='http://localhost:8000'


  let notify = () =>
    toast.success("User Deleted Successfully", {
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
  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/alldata`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        notifyerror("Unable to Get user Data");
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  let handledelet = (id) => {
    axios
      .delete(`${baseurl}/delete/${id}`)
      .then((res) => {
        console.log(id);
        notify();
        fetchData()
      })
      .catch(() => {
        console.log(id);
        notifyerror("Unable to Delet Data");
      });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="m-auto flex gap-3 mb-3 flex-wrap mt-2 justify-between ">
      {data.map((e) => (
        <div className="bg-gray-700 min-w-80  md:max-w-30  rounded flex flex-col p-2" key={e._id}>
          <h1>Id: {e._id}</h1> <h2>Name: {e.email}</h2>{" "}
          <h3>Password: {passwordslicer(e.password)+'....'}</h3>{" "}
          <button
            className="border-black mt-4 hover:bg-red-700 cursor-pointer  py-1   rounded text-white ring-red-500 ring-2 "
            onClick={() => {
              handledelet(e._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Delete;
