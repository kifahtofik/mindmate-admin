import React, { useState } from 'react';
import { 
  Box, Typography, Card, Grid, Stack, Chip, Button, InputBase,
  Table, TableBody, TableCell, TableHead, TableRow, 
  Dialog, DialogTitle, DialogContent, TextField, Rating, Avatar, Paper, IconButton,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { Search, MessageSquare, CheckCircle, Clock, Send, LifeBuoy, MoreVertical, ShieldCheck, Filter, AlertCircle } from 'lucide-react';

// --- YOUR FEATURE DATA & INTERFACES ---
const mockTickets = [
  { id: 't_***001', userId: 'u_***123', subject: 'Unable to access meditation content', category: 'technical', priority: 'medium', status: 'open', created: '2024-12-20 10:30', lastUpdate: '2024-12-20 10:30' },
  { id: 't_***002', userId: 'u_***456', subject: 'Request to delete account data', category: 'account', priority: 'high', status: 'in-progress', created: '2024-12-20 09:15', lastUpdate: '2024-12-20 11:20' },
  { id: 't_***003', userId: 'u_***789', subject: 'Inappropriate content reported', category: 'safety', priority: 'high', status: 'in-progress', created: '2024-12-20 08:45', lastUpdate: '2024-12-20 10:00' },
  { id: 't_***004', userId: 'u_***234', subject: 'Suggestion for new breathing exercise', category: 'content', priority: 'low', status: 'open', created: '2024-12-19 16:20', lastUpdate: '2024-12-19 16:20' },
  { id: 't_***005', userId: 'u_***567', subject: 'App crashing on iOS', category: 'technical', priority: 'high', status: 'resolved', created: '2024-12-19 14:10', lastUpdate: '2024-12-20 09:30' },
];

const mockFeedback = [
  { id: '1', rating: 5, comment: 'The meditation exercises have been incredibly helpful for my anxiety.', date: '2024-12-20', userId: 'u_***890' },
  { id: '2', rating: 4, comment: 'Great app, but would love more variety in the breathing exercises.', date: '2024-12-19', userId: 'u_***345' },
  { id: '3', rating: 5, comment: 'Life-changing. Thank you for creating this safe space.', date: '2024-12-19', userId: 'u_***678' },
  { id: '4', rating: 3, comment: 'Good content but the interface could be more intuitive.', date: '2024-12-18', userId: 'u_***123' },
];

export function FeedbackSupport() {
  // --- YOUR FEATURE LOGIC ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      default: return '#64748b';
    }
  };

  const getPriorityStyle = (priority) => {
    if (priority === 'high') return { border: '1px solid #fee2e2', color: '#ef4444', bgcolor: '#fef2f2' };
    if (priority === 'medium') return { border: '1px solid #ffedd5', color: '#f59e0b', bgcolor: '#fff7ed' };
    return { border: '1px solid #f1f5f9', color: '#64748b', bgcolor: '#f8fafc' };
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      {/* HEADER SECTION */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-2px' }}>Support Hub</Typography>
          <Typography sx={{ color: '#64748b', fontSize: '1.1rem' }}>Manage inquiries with care and responsiveness</Typography>
        </Box>
        <Button variant="contained" startIcon={<LifeBuoy size={18}/>} sx={{ borderRadius: '12px', bgcolor: '#3b82f6', px: 3, textTransform: 'none', fontWeight: 700 }}>Help Center</Button>
      </Stack>

      {/* STATS CARDS FEATURES */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { label: 'Open Tickets', val: mockTickets.filter(t => t.status === 'open').length, sub: 'Awaiting response', icon: <Clock color="#f59e0b"/>, color: '#f59e0b' },
          { label: 'In Progress', val: mockTickets.filter(t => t.status === 'in-progress').length, sub: 'Being handled', icon: <MessageSquare color="#3b82f6"/>, color: '#3b82f6' },
          { label: 'Resolved', val: mockTickets.filter(t => t.status === 'resolved').length, sub: 'Closed today', icon: <CheckCircle color="#10b981"/>, color: '#10b981' },
          { label: 'Avg. Response', val: '2.4h', sub: 'First response time', icon: <AlertCircle color="#64748b"/>, color: '#1e293b' }
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ p: 3, borderRadius: '20px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{stat.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: stat.color, my: 0.5 }}>{stat.val}</Typography>
                  <Typography variant="caption" color="textSecondary">{stat.sub}</Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: '#f8fafc', borderRadius: '10px' }}>{stat.icon}</Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* TICKET TABLE FEATURE */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: 'none', overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
              <Paper sx={{ p: '4px 12px', display: 'flex', alignItems: 'center', borderRadius: '10px', flexGrow: 1, border: '1px solid #e2e8f0' }} elevation={0}>
                <Search size={18} color="#94a3b8" />
                <InputBase 
                  sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }} 
                  placeholder="Search ID or Subject..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Paper>
              <Select 
                size="small" 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: '10px', minWidth: 140, fontSize: '0.85rem' }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
              </Select>
            </Box>
            
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.75rem' }}>TICKET ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.75rem' }}>SUBJECT</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.75rem' }}>PRIORITY</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.75rem' }}>STATUS</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#3b82f6' }}>{ticket.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{ticket.subject}</Typography>
                      <Typography variant="caption" color="textSecondary">{ticket.category} • {ticket.created}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={ticket.priority} size="small" sx={{ ...getPriorityStyle(ticket.priority), fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }} />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: getStatusColor(ticket.status) }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: getStatusColor(ticket.status), textTransform: 'uppercase' }}>{ticket.status}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => {setSelectedTicket(ticket); setOpen(true);}}
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700 }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* FEEDBACK LIST FEATURE */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>User Feedback</Typography>
          <Stack spacing={2}>
            {mockFeedback.map((f) => (
              <Card key={f.id} sx={{ p: 3, borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 800 }}>{f.userId.split('_')[1][3]}</Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>User {f.userId}</Typography>
                    <Rating value={f.rating} readOnly size="small" sx={{ fontSize: '0.75rem' }} />
                  </Box>
                  <Typography variant="caption" sx={{ ml: 'auto', color: '#94a3b8' }}>{f.date}</Typography>
                </Stack>
                <Typography variant="body2" color="textSecondary">"{f.comment}"</Typography>
              </Card>
            ))}
            
            <Card sx={{ p: 3, borderRadius: '24px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1.5, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <ShieldCheck size={24} color="#10b981" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>CSAT Score: 4.6/5.0</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Safety standards are met.</Typography>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* DETAIL DIALOG FEATURE */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '24px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 900, fontSize: '1.25rem' }}>
          Ticket Details: {selectedTicket?.id}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>SUBJECT</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>{selectedTicket?.subject}</Typography>
              <Typography variant="body2" color="textSecondary">
                Conversation history and full user description would be displayed here in a scrollable thread format.
              </Typography>
            </Box>
            
            <TextField 
              select 
              label="Update Status" 
              fullWidth 
              defaultValue={selectedTicket?.status}
              SelectProps={{ sx: { borderRadius: '12px' } }}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </TextField>

            <TextField 
              multiline 
              rows={4} 
              fullWidth 
              placeholder="Type your response to the user..." 
              label="Internal Note / Response"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: '12px' } }}
            />

            <Stack direction="row" spacing={2}>
              <Button fullWidth variant="outlined" onClick={() => setOpen(false)} sx={{ py: 1.5, borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}>Save Draft</Button>
              <Button fullWidth variant="contained" endIcon={<Send size={18}/>} sx={{ py: 1.5, borderRadius: '12px', bgcolor: '#3b82f6', textTransform: 'none', fontWeight: 700 }}>Send Response</Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default FeedbackSupport;