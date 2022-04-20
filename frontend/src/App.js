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
import SearchBar from "./components/SearchBar/SearchBar";


function App() {
  // const [videoTitle, setVideoTitle] = useState("");
  const [user, setUser] = useState(null);
  const [currentVideoId, setVideoId] = useState("");
  const [search, setSearch] = useState("");
  const [storedUserName, setStoredUserName] = useState("");
  const APIKEY = "AIzaSyAa59b7GkWZV_2mq-RETTRpSiIlwZwUiUY";
  const [videoDescription, setVideoDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const handleSelectedVideo = (someVideoId) => {
    setVideoId(someVideoId)
    getVideo(someVideoId)
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(jwt);
      setUser(decodedUser);
      console.log('Decoded user from App.jsx', decodedUser)
    } catch { }


    getVideo();
  }, []);

  async function getVideo(request = 'How they remember you') {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${request}&key=${APIKEY}&part=snippet`
      );
      console.log("getVideo function response data", response.data.items);
      setVideoId(response.data.items[0].id.videoId);
      setVideoDescription(response.data.items[0].snippet.description);
      setVideoTitle(response.data.items[0].snippet.title);
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
              getVideo={getVideo}
              storedUserName={storedUserName}
              user={user}
              setUser={setUser}
              videoId={currentVideoId}
              setVideoId={handleSelectedVideo}
              videoDescription={videoDescription}
              setVideoDescription={setVideoDescription}
              videoTitle={videoTitle}
              setVideoTitle={setVideoTitle}
              
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
