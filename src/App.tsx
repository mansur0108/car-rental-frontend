import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CarSelectPage from './pages/CarSelectPage';
import RecieptPage from './pages/RecieptPage';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/selection' element={<CarSelectPage />} />
		  <Route path='/reciept' element={<RecieptPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
