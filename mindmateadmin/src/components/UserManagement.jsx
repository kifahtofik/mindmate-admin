import React, { useState } from 'react';
import {
  Box, Typography, Card, Grid, Button, Chip, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Select, MenuItem,
  FormControl, InputLabel, Alert
} from "@mui/material";
import { 
  Search, Shield, UserX, Eye, AlertCircle, 
  Users, UserCheck, ShieldAlert 
} from 'lucide-react';

const mockUsers = [
  { id: '1', displayId: 'u_***123', joinDate: '2024-11-15', lastActive: '2 hours ago', status: 'active', role: 'user', activityLevel: 'high', flags: 0 },
  { id: '2', displayId: 'u_***456', joinDate: '2024-10-22', lastActive: '5 min ago', status: 'flagged', role: 'user', activityLevel: 'medium', flags: 2 },
  { id: '3', displayId: 'u_***789', joinDate: '2024-09-08', lastActive: '1 day ago', status: 'active', role: 'user', activityLevel: 'low', flags: 0 },
  { id: '4', displayId: 'u_***012', joinDate: '2024-12-01', lastActive: '30 min ago', status: 'active', role: 'user', activityLevel: 'high', flags: 0 },
  { id: '5', displayId: 'u_***345', joinDate: '2024-08-14', lastActive: '3 hours ago', status: 'suspended', role: 'user', activityLevel: 'low', flags: 5 },
  { id: '6', displayId: 'u_***678', joinDate: '2024-07-30', lastActive: '15 min ago', status: 'active', role: 'moderator', activityLevel: 'high', flags: 0 },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.displayId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusChip = (status) => {
    const styles = {
      active: { bgcolor: '#dcfce7', color: '#166534' },
      suspended: { bgcolor: '#fee2e2', color: '#991b1b' },
      flagged: { bgcolor: '#ffedd5', color: '#9a3412' }
    };
    return <Chip label={status} size="small" sx={{ ...styles[status], fontWeight: 700, textTransform: 'capitalize' }} />;
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
          User Management
        </Typography>
        
      </Box>

      <Alert 
        icon={<Shield size={20} />} 
        sx={{ mb: 4, borderRadius: '12px', bgcolor: '#eff6ff', color: '#1e40af', border: '1px solid #dbeafe' }}
      >
        <strong>Privacy Protection:</strong> User identities are masked with encrypted IDs. 
        Personal information requires high-level moderator clearance.
      </Alert>

      {/* Filters */}
      <Card variant="outlined" sx={{ mb: 4, borderRadius: '16px', p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search by masked User ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search size={18} /></InputAdornment>,
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ borderRadius: '12px' }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="flagged">Flagged</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Table */}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Joined</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Last Active</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{user.displayId}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getStatusChip(user.status)}
                    {user.flags > 0 && <Chip label={`${user.flags} Flags`} size="small" color="error" variant="outlined" />}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    variant={user.role === 'moderator' ? 'filled' : 'outlined'} 
                    color={user.role === 'moderator' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user)} color="primary">
                    <Eye size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <StatCard title="Total Users" value="2,847" icon={<Users color="#3b82f6"/>} />
        <StatCard title="Active Today" value="1,234" icon={<UserCheck color="#10b981"/>} />
        <StatCard title="Safety Flags" value="12" icon={<ShieldAlert color="#ef4444"/>} />
      </Grid>

      {/* Detail Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        {selectedUser && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>User Details: {selectedUser.displayId}</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <DetailItem label="Current Status" value={selectedUser.status} />
                <DetailItem label="User Role" value={selectedUser.role} />
                <DetailItem label="Registration Date" value={selectedUser.joinDate} />
                <DetailItem label="Activity Level" value={selectedUser.activityLevel} />
              </Grid>
              <Alert severity="warning" sx={{ mt: 3, borderRadius: '8px' }}>
                Suspending an account will block access to the MindMate Amharic Chatbot immediately.
              </Alert>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpen(false)} color="inherit">Close</Button>
              <Button variant="contained" color="error" startIcon={<UserX size={18} />}>
                Suspend Account
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

// Helper Components
function StatCard({ title, value, icon }) {
  return (
    <Grid item xs={12} md={4}>
      <Card variant="outlined" sx={{ p: 3, borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>{value}</Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#f1f5f9' }}>{icon}</Box>
      </Card>
    </Grid>
  );
}

function DetailItem({ label, value }) {
  return (
    <Grid item xs={6}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{label}</Typography>
      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
    </Grid>
  );
}