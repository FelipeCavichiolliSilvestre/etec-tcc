import React from 'react';
import { Outlet } from 'react-router';
import Paper from '@mui/material/Paper';

export default function WithNavbar() {
  return (
    <Paper elevation={0} sx={{ minHeight: '100vh' }}>
      <Outlet />
    </Paper>
  );
}
