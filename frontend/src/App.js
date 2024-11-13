import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import CreateAnime from './components/CreateAnime';
import Signup from "./pages/Signup";
import AnimePics from "./pages/AnimePics";
import NavBar from "./components/NavBar";
import EditAnime from './pages/EditAnime';


const App = () => {
  const [user, setUser] = useState(null);
  
  // Check if user is logged in when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Load user info from localStorage
    }
  }, []);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo)); // Store user info
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user info
  };

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}/>
        {/* <Route path="/signup" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}/> */}
        <Route path="/signup" element={<Signup />} />
 
        {/* Protected Routes */}
        <Route path="/" element={user ? (<Home onLogout={handleLogout} user={user} />) : ( <Navigate to="/login" />)} />
        <Route path="/create-anime" element={user ? <CreateAnime /> : <Navigate to="/login" />} />
        <Route path="/anime-pics" element={user ? <AnimePics /> : <Navigate to="/login" />} />
        <Route path="/edit-anime/:id" element={user ? <EditAnime /> : <Navigate to="/login" />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
