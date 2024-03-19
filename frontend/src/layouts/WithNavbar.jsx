import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

export default function WithNavbar() {
  return (
    <>
      <Navbar />
      <Paper elevation={0} sx={{ minHeight: '100vh' }}>
        <Toolbar sx={{ py: 1 }} />
        <Outlet />
      </Paper>
    </>
  );
}
