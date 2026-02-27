import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { 
  CssBaseline, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Typography, Divider, AppBar, Toolbar, Avatar, IconButton, 
  Badge, Snackbar, Alert, Stack, Button 
} from "@mui/material";
import { 
  LayoutDashboard, FileText, BarChart3, MessageSquare, Bell, LogOut, 
  Shield, Lock, Settings as SettingsIcon, ShieldCheck, Users, Search 
} from "lucide-react";

// Component Imports
import { Login } from "./components/Login.jsx"; // New Import
// import { Dashboard } from "./components/Dashboard.jsx";
import { UserManagement } from "./components/UserManagement.jsx";
import { ContentManagement } from "./components/ContentManagement.jsx";
import { FeedbackSupport } from "./components/FeedbackSupport.jsx";
import { SecurityRoles } from "./components/SecurityRoles.jsx";
import { Settings } from "./components/Settings.jsx";

const drawerWidth = 280;

// --- PERSISTENT HEADER ---
const Header = () => (
  <AppBar 
    position="fixed" 
    elevation={0}
    sx={{ 
      width: `calc(100% - ${drawerWidth}px)`, 
      ml: `${drawerWidth}px`,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)', // Modern glass effect
      borderBottom: '1px solid #e2e8f0',
      color: '#0f172a',
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', letterSpacing: '0.5px' }}>
        MINDMATE ADMIN 
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px', my: 'auto' }} />
        
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1 }}>Admin User</Typography>
            <Typography variant="caption" sx={{ color: '#3b82f6', fontWeight: 600 }}>Super Admin</Typography>
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: '#3b82f6', 
              fontWeight: 800, 
              width: 36, 
              height: 36,
              fontSize: '0.9rem',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
            }}
          >
            AD
          </Avatar>
        </Stack>
      </Box>
    </Toolbar>
  </AppBar>
);

// --- PERSISTENT SIDEBAR ---
const Sidebar = ({ onSignOut }) => { // Added prop for logout
  const location = useLocation();
  const menuItems = [
    { text: "User Management", icon: <Users size={20} />, path: "/user-management" },
    { text: "Content Management", icon: <FileText size={20} />, path: "/content-management" },
    { text: "Feedback & Support", icon: <MessageSquare size={20} />, path: "/feedback-support" },
    { text: "Security & Roles", icon: <Lock size={20} />, path: "/security-roles" },
    { text: "Settings", icon: <SettingsIcon size={20} />, path: "/settings" },
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
      <Box sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
          onClick={onSignOut} // Trigger logout logic
          startIcon={<LogOut size={18}/>} 
          sx={{ borderRadius: '12px', fontWeight: 700, justifyContent: 'flex-start', px: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

// --- MAIN APP ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

  const showVerification = (msg) => {
    setNotify({ open: true, message: msg, severity: 'success' });
  };

  // If not logged in, show the Login screen exclusively
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <CssBaseline />
        <Header />
        <Sidebar onSignOut={() => setIsAuthenticated(false)} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 4, 
            mt: 9, 
            width: `calc(100% - ${drawerWidth}px)`,
            minHeight: '100vh'
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/user-management" replace />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/user-management" element={<UserManagement onSave={showVerification} />} />
            <Route path="/content-management" element={<ContentManagement />} />
           
           
            <Route path="/feedback-support" element={<FeedbackSupport />} />
           
            <Route path="/security-roles" element={<SecurityRoles />} />
            <Route path="/settings" element={<Settings onSave={showVerification} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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