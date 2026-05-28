import React from 'react';
import { Typography, Card, CardContent, Grid, Box, Paper, Avatar } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import 'leaflet/dist/leaflet.css';

const DashboardPage = () => {
  const cardData = [
    { title: 'Total Users', value: '9', icon: <PeopleIcon fontSize="small" />, bgColor: '#eef2ff', iconBg: '#e0e7ff', iconColor: '#3730a3' },
    { title: 'Active Users', value: '5', icon: <HowToRegIcon fontSize="small" />, bgColor: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#065f46' },
    { title: 'New Users', value: '7', icon: <PersonAddIcon fontSize="small" />, bgColor: '#fff9c4', iconBg: '#fef3c7', iconColor: '#92400e' },
    { title: 'Average Age', value: '35', icon: <AssessmentIcon fontSize="small" />, bgColor: '#fff1f2', iconBg: '#ffe4e6', iconColor: '#9f1239' },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#fffbf2', minHeight: '100vh' }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Overview of system performance and activity
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
          Last Updated: Just Now
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: card.bgColor,
                borderRadius: '20px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                },
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: card.iconBg, color: card.iconColor, mb: 2 }}>
                  {card.icon}
                </Avatar>

                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  {card.title}
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827' }}>
                  {card.value}
                </Typography>

                <Typography variant="caption" sx={{ color: 'green', fontWeight: 600 }}>
                  +2.5% from last week
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Operations Map
      </Typography>

      <Paper sx={{ position: 'relative', height: 450, borderRadius: '24px', overflow: 'hidden' }}>
        
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: '#fff',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Active Location
          </Typography>
          <Typography variant="caption">Vongola HQ</Typography>
        </Box>

        <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>Vongola HQ</Popup>
          </Marker>
        </MapContainer>
      </Paper>
    </Box>
  );
};

export default DashboardPage;