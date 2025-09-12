import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import { useState } from "react";
import SignUp from "./component/SignUp";
import ChatApp from "./component/ChatApp";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ user ? <Navigate to="/chat" /> : <Login onLogin={ setUser }/>} />
        <Route path="/signup" element={ user ? <Navigate to="/chat" /> : <SignUp onLogin={ setUser }/>} />
        <Route path="/chat" element={ user ? <ChatApp user = { user } /> : <Navigate to="/login"/>} />
        <Route path="/" element={ <Navigate to={ user ? "/chat" : "/login" }/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
