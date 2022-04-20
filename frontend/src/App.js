import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Home from "./components/Home/Home.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";


function App() {
  // const [videoTitle, setVideoTitle] = useState("");
  const [user, setUser] = useState(null);
  const [currentVideoId, setVideoId] = useState("");
  const [search, setSearch] = useState("");
  const [storedUserName, setStoredUserName] = useState("");
  const APIKEY = "AIzaSyCGCESY1CjRJSKHwX_ju4zfz0klFjmzipw";

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(jwt);
      setUser(decodedUser);
      console.log('Decoded user from App.jsx', decodedUser)
    } catch { }


    getVideo("purpose");
  }, []);

  async function getVideo(request) {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${request}&key=${APIKEY}`
      );
      console.log("getVideo function response data", response.data);
      setVideoId(response.data.items[0].id.videoId);
    } catch (err) {
      console.log("Error in getVideo call: ", err);
    }
  }

  return (
    <div className="App">
      <NavBar search={search} setSearch={setSearch} getVideo={getVideo} />
      <Routes>
        <Route
          
          path="/"
          element={
            <Home
              storedUserName={storedUserName}
              user={user}
              setUser={setUser}
              videoId={currentVideoId}
              setVideoId={setVideoId}
              
            />
          }
         />
        <Route
          path="/home"
          element={() => {
            if (!user) {
              return <LoginPage />;
            } else {
              return <Home user={user} />;
            }
          }}
        />
        <Route
          path="/login"
          element={
            <LoginPage user={user} setStoredUserName={setStoredUserName} />
          }
        />
        <Route
          
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
