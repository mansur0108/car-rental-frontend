import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CarSelectPage from './pages/CarSelectPage';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/selection' element={<CarSelectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
