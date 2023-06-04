import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import Room from "./pages/Room.jsx";
import Canvas from "./pages/Canvas.jsx";
import FirstScreen from "./pages/FirstScreen.jsx";
import Home from "./pages/Home.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import FullScreenResult from "./pages/FullScreenResult.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
function App() {
  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<Room />} />
          <Route path="/canvas/:projectId" element={<Canvas />} />
          <Route path="/result/:projectId" element={<FullScreenResult />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
