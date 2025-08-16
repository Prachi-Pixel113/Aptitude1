import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import QuizPage from "./components/QuizPage";
import { mockAPI } from "./mock";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const checkAuth = async () => {
      const token = localStorage.getItem('triaptToken');
      if (token) {
        try {
          const userData = await mockAPI.getUserData(token);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('triaptToken');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await mockAPI.login(email, password);
      localStorage.setItem('triaptToken', response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await mockAPI.signup(name, email, password);
      localStorage.setItem('triaptToken', response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('triaptToken');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--bg-page)'
      }}>
        <div className="body-large">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/quiz" /> : <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? <Navigate to="/quiz" /> : <SignupPage onSignup={handleSignup} />
            } 
          />
          <Route 
            path="/quiz" 
            element={
              user ? <QuizPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;