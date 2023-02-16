import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import SendEmail from "./components/SendEmail";

function App () {
  return (
    <>
    <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route path="/send" element={<SendEmail />}></Route>
        </Routes>
      </Router>
      </>
  );
}

export default App;