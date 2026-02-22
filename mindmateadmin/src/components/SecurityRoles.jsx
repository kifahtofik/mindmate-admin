import React, { useState } from 'react';
import {
  Box, Typography, Card, Grid, Button, Chip, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Switch, List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, LinearProgress, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, FormGroup, FormControlLabel, Checkbox
} from "@mui/material";
import {
  Shield, Lock, Key, Eye, FileText, UserCheck, 
  ShieldCheck, RefreshCcw, Plus
} from 'lucide-react';

const mockRoles = [
  { id: '1', name: 'Super Admin', users: 2, permissions: ['all'] },
  { id: '2', name: 'Admin', users: 3, permissions: ['user_management', 'content', 'analytics', 'support'] },
  { id: '3', name: 'Content Manager', users: 5, permissions: ['content', 'analytics'] },
  { id: '4', name: 'Support Manager', users: 8, permissions: ['support', 'user_view'] },
  { id: '5', name: 'Safety Monitor', users: 4, permissions: ['safety', 'user_view'] },
];

const mockAuditLog = [
  { id: '1', action: 'User suspended', admin: 'admin_***001', timestamp: '2024-12-20 14:23:00', details: 'User u_***890 suspended for policy violation' },
  { id: '2', action: 'Content published', admin: 'content_***005', timestamp: '2024-12-20 13:45:00', details: 'Article "Understanding Anxiety" published' },
  { id: '3', action: 'Safety alert reviewed', admin: 'safety_***002', timestamp: '2024-12-20 12:10:00', details: 'Alert a_***456 marked as resolved' },
  { id: '4', action: 'Role assigned', admin: 'admin_***001', timestamp: '2024-12-20 11:30:00', details: 'User admin_***007 assigned Support Manager role' },
];

export function SecurityRoles() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>Security & Roles</Typography>
        <Typography color="textSecondary">Manage role-based access control and monitor admin actions</Typography>
      </Box>

      <Alert 
        icon={<ShieldCheck size={20} />} 
        sx={{ mb: 4, borderRadius: '12px', bgcolor: '#eff6ff', color: '#1e40af', border: '1px solid #dbeafe' }}
      >
        <strong>Security First:</strong> All administrative actions are logged and encrypted.
      </Alert>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <StatCard icon={<UserCheck size={20}/>} title="Admin Users" value="22" color="#3b82f6" />
        <StatCard icon={<Key size={20}/>} title="Active Roles" value="5" color="#8b5cf6" />
        <StatCard icon={<Lock size={20}/>} title="Login Failures" value="0" color="#ef4444" />
        <StatCard icon={<FileText size={20}/>} title="Audit Events" value="1,234" color="#10b981" />
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {/* Role Table */}
          <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Role Management</Typography>
              <Button 
                variant="contained" 
                startIcon={<Plus size={18}/>}
                onClick={() => setOpen(true)}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700 }}
              >
                New Role
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableHeadCell>Role Name</TableHeadCell>
                    <TableHeadCell>Users</TableHeadCell>
                    <TableHeadCell>Permissions</TableHeadCell>
                    <TableHeadCell align="right">Actions</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockRoles.map((role) => (
                    <TableRow key={role.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{role.name}</TableCell>
                      <TableCell><Chip label={`${role.users} Users`} size="small" variant="outlined" /></TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {role.permissions.slice(0, 2).map(p => (
                            <Chip key={p} label={p} size="small" sx={{ fontSize: '10px' }} />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><Eye size={18} /></IconButton>
                        <Button size="small" sx={{ fontWeight: 700 }}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', p: 3, boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Security Settings</Typography>
            <List>
              <SecurityToggle label="Two-Factor Auth" sub="Required for all" checked />
              <SecurityToggle label="Session Timeout" sub="30 min inactivity" checked />
              <SecurityToggle label="IP Allowlist" sub="Restrict by location" />
              <SecurityToggle label="Audit Retention" sub="2 years (Locked)" checked disabled />
            </List>
          </Card>
        </Grid> */}
      </Grid>

      {/* CREATE ROLE MODAL */}
      <CreateRoleDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ icon, title, value, color }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1, borderRadius: '8px', bgcolor: `${color}15`, color: color }}>{icon}</Box>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

function TableHeadCell({ children, align = "left" }) {
  return <TableCell align={align} sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', fontSize: '11px' }}>{children}</TableCell>;
}

function SecurityToggle({ label, sub, checked = false, disabled = false }) {
  return (
    <ListItem disableGutters>
      <ListItemText 
        primary={<Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{label}</Typography>}
        secondary={sub}
      />
      <ListItemSecondaryAction>
        <Switch edge="end" defaultChecked={checked} disabled={disabled} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function CreateRoleDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogTitle sx={{ fontWeight: 800 }}>Create New Role</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Role Name" placeholder="e.g. Content Manager" sx={{ mt: 2, mb: 3 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Permissions</Typography>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" />} label="User Management" />
            <FormControlLabel control={<Checkbox size="small" />} label="System Settings" />
            <FormControlLabel control={<Checkbox size="small" />} label="Analytics Access" />
          </FormGroup>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={onClose} sx={{ borderRadius: '8px' }}>Create Role</Button>
      </DialogActions>
    </Dialog>
  );
}