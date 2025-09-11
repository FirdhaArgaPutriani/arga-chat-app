import { Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./component/Login";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ user ? <Navigate to="/chat" /> : <Login onLogin={ setUser }/>} />
      </Routes>
    </Router>
  );
};

export default App;
