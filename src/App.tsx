import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CarSelectPage from './pages/CarSelectPage';
import RecieptPage from './pages/RecieptPage';
import VendorDashPage from './pages/VendorDashPage';
import ReviewPage from './pages/ReviewPage';
import VendorCarSelectionPage from './pages/VendorCarSelectionPage';
import VendorCarDetailsPage from './pages/VendorCarDetailsPage';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

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
          <Route path='/review' element={<ReviewPage />} />
          <Route path='/vendash' element={<VendorDashPage />} />
          <Route path='/vendorcars' element={<VendorCarSelectionPage />} />
          <Route path='/vendorcardetail' element={<VendorCarDetailsPage />} />
          <Route path='/reciept' element={<RecieptPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
