import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentification from "./components/auth/Signup";
import EmailVerify from "./components/EmailVerify/EmailVerify";
import Login from "./components/auth/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Authentification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
