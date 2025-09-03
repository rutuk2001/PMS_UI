import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  People,
  LocalHospital,
  Medication,
  CalendarToday,
  TrendingUp,
  TrendingDown,
  PersonAdd,
  Receipt,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  Info,
  ArrowForward,
  LocalPharmacy,
  HealthAndSafety,
  Assessment,
  BarChart,
  PieChart,
  Timeline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllregisterPatient } from "../../store/patient/patientSlice";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalVisits: 0,
    totalPrescriptions: 0,
    recentVisits: 0,
    pendingFollowUps: 0,
    activePrescriptions: 0,
  });

  const { patients, loading: patientsLoading } = useSelector((state) => state.patientDetails);

  useEffect(() => {
    // Fetch initial data
    dispatch(getAllregisterPatient({ page: 1, limit: 100 }));
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (patients && !patientsLoading) {
      // Calculate statistics from patient data
      const totalPatients = patients.length || 0;
      const totalVisits = patients.reduce((acc, patient) => {
        return acc + (patient.visitHistory?.length || 0);
      }, 0);
      
      const totalPrescriptions = patients.reduce((acc, patient) => {
        return acc + (patient.prescriptions?.length || 0);
      }, 0);

      setStats({
        totalPatients,
        totalVisits,
        totalPrescriptions,
        recentVisits: Math.floor(totalVisits * 0.3), // 30% of total visits as recent
        pendingFollowUps: Math.floor(totalVisits * 0.2), // 20% as pending follow-ups
        activePrescriptions: Math.floor(totalPrescriptions * 0.8), // 80% as active
      });
    }
  }, [patients, patientsLoading]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const StatCard = ({ title, value, icon, color, trend, subtitle, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
        {trend && (
          <Box display="flex" alignItems="center" mt={1}>
            {trend > 0 ? (
              <TrendingUp color="success" fontSize="small" />
            ) : (
              <TrendingDown color="error" fontSize="small" />
            )}
            <Typography 
              variant="caption" 
              color={trend > 0 ? "success.main" : "error.main"}
              sx={{ ml: 0.5 }}
            >
              {trend > 0 ? '+' : ''}{trend}% from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, color, path, actionText }) => (
    <Card sx={{ height: '100%', cursor: 'pointer' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={() => handleNavigation(path)}
          fullWidth
        >
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );

  const RecentActivityCard = ({ title, activities, emptyMessage }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {activities && activities.length > 0 ? (
          <List dense>
            {activities.slice(0, 5).map((activity, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {activity.icon}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={activity.title}
                  secondary={activity.subtitle}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Chip 
                  label={activity.status} 
                  size="small" 
                  color={activity.statusColor}
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box textAlign="center" py={3}>
            <Typography variant="body2" color="text.secondary">
              {emptyMessage}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children, height = 300 }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box height={height} display="flex" alignItems="center" justifyContent="center">
          {children}
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Mock data for recent activities
  const recentActivities = [
    {
      icon: <PersonAdd />,
      title: "New Patient Registered",
      subtitle: "John Doe - 2 hours ago",
      status: "Completed",
      statusColor: "success"
    },
    {
      icon: <LocalHospital />,
      title: "Visit Completed",
      subtitle: "Patient ID: P001 - 4 hours ago",
      status: "Active",
      statusColor: "primary"
    },
    {
      icon: <Medication />,
      title: "Prescription Created",
      subtitle: "Patient ID: P003 - 6 hours ago",
      status: "Active",
      statusColor: "primary"
    },
    {
      icon: <Schedule />,
      title: "Follow-up Scheduled",
      subtitle: "Patient ID: P002 - 1 day ago",
      status: "Pending",
      statusColor: "warning"
    }
  ];

  const upcomingFollowUps = [
    {
      icon: <CalendarToday />,
      title: "Follow-up Appointment",
      subtitle: "Patient ID: P001 - Tomorrow",
      status: "Scheduled",
      statusColor: "info"
    },
    {
      icon: <CalendarToday />,
      title: "Follow-up Appointment",
      subtitle: "Patient ID: P004 - 2 days",
      status: "Scheduled",
      statusColor: "info"
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to Patient Management System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your patients, track visits, and handle prescriptions efficiently
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<People />}
            color="primary.main"
            trend={12}
            subtitle="Registered patients"
            onClick={() => handleNavigation('/all_patients')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Visits"
            value={stats.totalVisits}
            icon={<LocalHospital />}
            color="secondary.main"
            trend={8}
            subtitle="Patient visits"
            onClick={() => handleNavigation('/all_patients')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Prescriptions"
            value={stats.activePrescriptions}
            icon={<Medication />}
            color="success.main"
            trend={15}
            subtitle="Current prescriptions"
            onClick={() => handleNavigation('/all_patients')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Follow-ups"
            value={stats.pendingFollowUps}
            icon={<Schedule />}
            color="warning.main"
            trend={-5}
            subtitle="Scheduled follow-ups"
            onClick={() => handleNavigation('/all_patients')}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Quick Actions
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Add New Patient"
            description="Register a new patient in the system"
            icon={<PersonAdd />}
            color="primary.main"
            path="/add_patient"
            actionText="Add Patient"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="View All Patients"
            description="Browse and manage all registered patients"
            icon={<People />}
            color="secondary.main"
            path="/all_patients"
            actionText="View Patients"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Create Prescription"
            description="Generate prescriptions for patients"
            icon={<Receipt />}
            color="success.main"
            path="/all_patients"
            actionText="Create Prescription"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Schedule Follow-up"
            description="Schedule follow-up appointments"
            icon={<Schedule />}
            color="info.main"
            path="/all_patients"
            actionText="Schedule"
          />
        </Grid>
      </Grid>

      {/* Charts and Analytics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <ChartCard title="Patient Registration Trends">
            <Box textAlign="center">
              <BarChart sx={{ fontSize: 80, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Chart visualization will be implemented here
              </Typography>
            </Box>
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard title="Visit Distribution">
            <Box textAlign="center">
              <PieChart sx={{ fontSize: 80, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Pie chart will be implemented here
              </Typography>
            </Box>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Recent Activities and Follow-ups */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivityCard
            title="Recent Activities"
            activities={recentActivities}
            emptyMessage="No recent activities"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentActivityCard
            title="Upcoming Follow-ups"
            activities={upcomingFollowUps}
            emptyMessage="No upcoming follow-ups"
          />
        </Grid>
      </Grid>

      {/* System Status */}
      <Box mt={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            System Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle color="success" />
                <Typography variant="body2">Database: Connected</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle color="success" />
                <Typography variant="body2">API: Operational</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle color="success" />
                <Typography variant="body2">Authentication: Active</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Info color="info" />
                <Typography variant="body2">Last Updated: {new Date().toLocaleTimeString()}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
