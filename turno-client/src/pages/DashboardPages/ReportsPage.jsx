import React from 'react';
import { Typography, Box, Grid, Paper, Divider, Avatar, Chip } from '@mui/material';
import { BarChart, PieChart, Gauge } from '@mui/x-charts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InsightsIcon from '@mui/icons-material/Insights';

const ReportsPage = () => {

  const stats = [
    {
      title: 'Total Reports',
      value: '128',
      change: '+12%',
      icon: <AssessmentIcon />,
      bg: '#e8f0fe',
      color: '#1a73e8'
    },
    {
      title: 'Report Growth',
      value: '+18%',
      change: 'Last 30 days',
      icon: <TrendingUpIcon />,
      bg: '#e6f4ea',
      color: '#188038'
    },
    {
      title: 'Active Insights',
      value: '42',
      change: '+5 new today',
      icon: <InsightsIcon />,
      bg: '#fef7e0',
      color: '#b06000'
    }
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
          Reports
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Monitor system analytics, trends, and performance insights
        </Typography>
      </Box>

      {/* 🔥 KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  {card.title}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                  {card.value}
                </Typography>

                <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                  {card.change}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  bgcolor: card.bg,
                  color: card.color,
                  width: 48,
                  height: 48
                }}
              >
                {card.icon}
              </Avatar>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 🔥 Main Chart Card */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              User Growth Trend
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Last 6 months activity
            </Typography>
          </Box>

          <Chip label="Monthly" size="small" />
        </Box>

        <BarChart
          series={[
            {
              data: [120, 150, 180, 220, 260, 310],
              label: 'Active Users',
              color: '#4f46e5'
            }
          ]}
          height={320}
          xAxis={[{
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            scaleType: 'band'
          }]}
        />
      </Paper>

      {/* 🔥 Lower Section */}
      <Grid container spacing={4}>

        {/* Gauge */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              System Performance
            </Typography>

            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
              Overall system efficiency score
            </Typography>

            <Gauge width={150} height={150} value={75} />

            <Typography variant="body2" sx={{ mt: 2, color: '#6b7280' }}>
              Performance stable this week
            </Typography>
          </Paper>
        </Grid>

        {/* Mission Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 4, height: 24, backgroundColor: '#4f46e5', mr: 2, borderRadius: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Mission Success Rates
              </Typography>
            </Box>

            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Completed', color: '#4f46e5' },
                { data: [51, 6, 49, 30], label: 'Failed', color: '#ef4444' }
              ]}
              height={300}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              User Distribution
            </Typography>

            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
              Breakdown of user roles in the system
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <PieChart
              series={[{
                data: [
                  { id: 0, value: 10, label: 'Guardians' },
                  { id: 1, value: 15, label: 'Associates' },
                  { id: 2, value: 20, label: 'Intel' },
                ],
                innerRadius: 60,
                paddingAngle: 4,
                cornerRadius: 6,
              }]}
              height={320}
            />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ReportsPage;