import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import {
  CssBaseline, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, AppBar, Toolbar, Button, Snackbar, Alert, Stack
} from "@mui/material";
import { LogOut, Users, FileText } from "lucide-react";

// Component Imports
import { Login } from "./components/Login.jsx";
import { Signup } from "./components/Signup.jsx";
import { UserManagement } from "./components/UserManagement.jsx";
import { ContentManagement } from "./components/ContentManagement.jsx";

const drawerWidth = 280;

// --- HEADER ---
const Header = () => (
  <AppBar
    position="fixed"
    elevation={0}
    sx={{
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #e2e8f0',
      color: '#0f172a',
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', letterSpacing: '0.5px' }}>
        MINDMATE ADMIN
      </Typography>
    </Toolbar>
  </AppBar>
);

// --- SIDEBAR ---
const Sidebar = ({ onSignOut }) => {
  const location = useLocation();
  const menuItems = [
    { text: "User Management", icon: <Users size={20} />, path: "/user-management" },
    { text: "Content Management", icon: <FileText size={20} />, path: "/content-management" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e2e8f0',
          background: '#ffffff'
        },
      }}
    >
      <Box sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-1px', color: '#1e293b' }}>
          MINDMATE
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link} to={item.path}
                sx={{
                  borderRadius: '12px',
                  bgcolor: active ? '#eff6ff' : 'transparent',
                  color: active ? '#3b82f6' : '#64748b',
                  '&:hover': { bgcolor: '#f1f5f9', color: '#3b82f6' },
                  transition: 'all 0.2s ease'
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: active ? 800 : 500, fontSize: '0.9rem' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          fullWidth
          variant="text"
          color="error"
          onClick={onSignOut}
          startIcon={<LogOut size={18} />}
          sx={{ borderRadius: '12px', fontWeight: 700, justifyContent: 'flex-start', px: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

// --- PROTECTED ROUTE ---
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

// --- MAIN APP ---
export default function App() {
  // Pure React state; resets on reload
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

  const showNotification = (msg, severity = 'success') => {
    setNotify({ open: true, message: msg, severity });
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <CssBaseline />
        {isAuthenticated && <Header />}
        {isAuthenticated && <Sidebar onSignOut={() => setIsAuthenticated(false)} />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            mt: 9,
            width: isAuthenticated ? `calc(100% - ${drawerWidth}px)` : "100%", minHeight: '100vh'
          }}
        >
          <Routes>

            {/* Public Routes */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/user-management" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/user-management" replace /> : <Signup />}
            />
            <Route
              path="/"
              element={<Navigate to="/signup" replace />}
            />

            {/* Protected Routes */}
            <Route
              path="/user-management"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserManagement onSave={(msg) => showNotification(msg)} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content-management"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ContentManagement />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
        </Box>

        <Snackbar
          open={notify.open}
          autoHideDuration={4000}
          onClose={() => setNotify({ ...notify, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setNotify({ ...notify, open: false })}
            severity={notify.severity}
            variant="filled"
            sx={{ width: '100%', borderRadius: '12px', fontWeight: 600, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          >
            {notify.message}
          </Alert>
        </Snackbar>
      </Box>
    </Router>
  );
}