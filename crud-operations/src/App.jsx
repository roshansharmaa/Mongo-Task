import React from "react";
import Add from "./comp/Add";
import List from "./comp/List";
import Nav from "./comp/Nav";
import Update from "./comp/Update";
import Delete from "./comp/Delete";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col  w-full max-w-5xl m-auto ">
      <Nav />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
    
    </div>
  );
}

export default App;
