import React from 'react';
import { Typography, Box, Paper, Grid, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PeopleIcon from '@mui/icons-material/People';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 24 },
  { id: 6, lastName: 'Melisandre', firstName: 'Unknown', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const UsersPage = () => {

  const stats = [
    {
      title: 'Total Users',
      value: '9',
      icon: <PeopleIcon />,
      bg: '#e8f0fe',
      color: '#1a73e8'
    },
    {
      title: 'Active Users',
      value: '5',
      icon: <HowToRegIcon />,
      bg: '#e6f4ea',
      color: '#188038'
    },
    {
      title: 'New Users',
      value: '7',
      icon: <PersonAddIcon />,
      bg: '#fef7e0',
      color: '#b06000'
    },
    {
      title: 'Average Age',
      value: '35.2',
      icon: <AssessmentIcon />,
      bg: '#fce8e6',
      color: '#d93025'
    }
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f6fa', minHeight: '100vh' }}>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
        Users
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                backgroundColor: card.bg,
                borderRadius: 3,
                p: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#fff',
                  color: card.color,
                  mb: 2
                }}
              >
                {card.icon}
              </Avatar>

              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <input
          placeholder="Search users..."
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            outline: 'none',
            backgroundColor: '#fff'
          }}
        />

        <Typography
          sx={{
            backgroundColor: '#1e88e5',
            color: '#fff',
            px: 2,
            py: 1,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          + Add User
        </Typography>
      </Box>

      {/* Table */}
      <Paper
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
        }}
      >
        {/* 🔥 Table Header (NEW) */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff'
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 24,
              backgroundColor: '#1e88e5',
              mr: 2,
              borderRadius: 1
            }}
          />
          <Typography fontWeight="bold">
            User Management Table
          </Typography>
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 0,

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f9fafb',
                fontWeight: 'bold'
              },

              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f3f4f6'
              },

              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9'
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UsersPage;