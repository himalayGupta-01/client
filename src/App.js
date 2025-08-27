import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import axios from "axios";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Progress from "./Components/Progress";
import Stats from "./Components/Stats";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
