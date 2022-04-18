import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Home from "./Components/Home/Home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [videoTitle, setVideoTitle] = useState("");
  const [user, setUser] = useState(null);
  const [currentVideoId, setVideoId] = useState("");
  const [search, setSearch] = useState("");
  const [storedUserName, setStoredUserName] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    try {
      const decodedUser = jwt_decode(jwt);
      setUser(decodedUser);
    } catch {}
    getVideo();
  }, []);

  async function getVideo(request) {
    let response = await axios.get(
      www.googleapis.com/youtube/v3/search?q={SEARCH QUERY HERE}&key={API KEY HERE}
    );
    console.log("getVideo function response data", response.data);
    try {
      setVideoId(response.data.items[0].id.videoId);
    } catch {}
  }



  return (
    <div className="App">
      <NavBar
        search={search}
        setSearch={setSearch}
        getVideo={getVideo}
      />
      <Routes>
        <Route
          exact
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
          path="home"
          element={() => {
            if (!user) {
              return <LoginForm />;
            } else {
              return <Home user={user} />;
            }
          }}
        />
        <Route
          path="loginform/*"
          element={
            <LoginForm user={user} setStoredUserName={setStoredUserName} />
          }
        />
        <Route
          exact
          path="loginform/registration"
          element={<RegistrationForm />}
        />
      </Routes>
    </div>
  );
}

export default App;