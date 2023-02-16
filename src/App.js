import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import SendEmail from "./components/SendEmail";
import UploadCSV from "./pages/uploadCSV";

function App () {
  return (
    <>
    <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route path="/send" element={<SendEmail />}></Route>
          <Route path="/csv" element={<UploadCSV />}></Route>
        </Routes>
      </Router>
      </>
  );
}

export default App;