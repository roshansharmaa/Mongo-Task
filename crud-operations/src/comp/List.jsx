import React, { useEffect, useState } from "react";
import axios from "axios";
import {passwordslicer} from "./Helper";

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let baseurl='http://localhost:8000'


  useEffect(() => {
    // Make GET request to fetch data
    axios
      .get(`${baseurl}/alldata`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

 
  // passwordslicer()

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

    // <div className="bg-gray-700 " key={e._id}>

    <div className="m-auto flex gap-3 mb-3 flex-wrap mt-2 justify-between ">
      {data.map((e) => (
        <div className="bg-gray-700 min-w-80  md:max-w-30 justify-between rounded flex flex-col p-2 h-25" key={e._id}>
          <h1>Id: {e._id}</h1> <h2 className="text-green-500 text-1xl">Name: {e.email}</h2>{" "}
          <h3>Password: {e.password.length>7?(passwordslicer(e.password)+'.....'):e.password}</h3>{" "}
        </div>
      ))}
    </div>
  );
}

export default List;
