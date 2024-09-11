import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/PrivateRoute';
import UpdateEvent from './pages/updateEvent';
import CreatorDashboard from './pages/CreatorDashboard';

import './App.css';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events/update/:id" element={<UpdateEvent />} />
            <Route path="/creator-dashboard" element={<PrivateRoute requiredRole="creator">
              <CreatorDashboard /></PrivateRoute>} />
            <Route 
                path="/profile" 
                element={
                  <PrivateRoute> 
                    <Profile />
                  </PrivateRoute>
                } 
              />
        
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

// This is a comment to trigger a new deployment
