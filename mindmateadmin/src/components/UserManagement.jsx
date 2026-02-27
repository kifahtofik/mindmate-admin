import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, Grid, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Alert
} from "@mui/material";
import { Search, Users, Shield } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users"; 

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data.users || []);
      setTotalUsers(res.data.totalUsers || (res.data.users || []).length);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const userName = user.name || "";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
        User Management
      </Typography>

      <Alert
        icon={<Shield size={18} />}
        sx={{ mb: 4, borderRadius: 2, bgcolor: "#eff6ff" }}
      >
        Mobile application users overview (read-only).
      </Alert>

      {/* Search */}
      <Card sx={{ mb: 3, p: 2, borderRadius: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Signup Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading users...</TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No users found</TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>
                   
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Stats */}
      <Grid container spacing={10} sx={{ mt: 3 }}>
        <StatCard
          title="Total Mobile App Users"
          value={totalUsers}
          icon={<Users color="#3b82f6" />}
        />
      </Grid>

      {/* User Detail Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        {selectedUser && (
          <>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent dividers>
              <Typography><strong>Username:</strong> {selectedUser.name}</Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Signup Date:</strong>{" "}
                {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "N/A"}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

/* Helper */
function StatCard({ title, value, icon }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ p: 3, borderRadius: 3, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, bgcolor: "#f1f5f9", borderRadius: 2 }}>
          {icon}
        </Box>
      </Card>
    </Grid>
  );
}