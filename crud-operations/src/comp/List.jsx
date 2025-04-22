import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="m-auto flex gap-3 flex-wrap mt-2 justify-center ">
      {data.map((e) => (
        <div className="bg-gray-700 rounded flex flex-col p-2" key={e._id}>
          <h1>Id: {e._id}</h1> <h2>Name: {e.email}</h2>{" "}
          <h3>Password: {e.password}</h3>{" "}
        </div>
      ))}
    </div>
  );
}

export default List;
