import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import Room from "./pages/Room.jsx";
import Canvas from "./pages/Canvas.jsx";
function App() {
  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createRoom" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/canvas/:roomId" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
