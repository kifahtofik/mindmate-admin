import React, { useState } from 'react';
import {
  Box, Typography, Button, Card, Table, TableBody,
  TableCell, TableHead, TableRow, Tabs, Tab, Chip, Dialog,
  DialogTitle, DialogContent, TextField, Grid, MenuItem, IconButton,
  Stack, Rating, Tooltip, InputAdornment
} from "@mui/material";
import { Plus, Brain, Eye, Tag, Target, BarChart3 } from 'lucide-react';

export function ContentManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    category: 'Anxiety',
    triggers: '',
    content: ''
  });
  const [file, setFile] = useState(null);

  const [resources] = useState([
    { id: 1, title: 'Grounding 5-4-3-2-1', type: 'exercise', category: 'Anxiety', status: 'Published', views: 1240, rating: 4.8, triggers: ['panic', 'stress', 'fear'] },
    { id: 2, title: 'Understanding PTSD', type: 'video', category: 'Education', status: 'Draft', views: 0, rating: 0, triggers: ['trauma', 'flashback'] },
    { id: 3, title: 'Mindful Morning', type: 'article', category: 'Routine', status: 'Published', views: 850, rating: 4.5, triggers: ['morning', 'sad', 'lazy'] },
    { id: 4, title: 'CBT for Negative Thoughts', type: 'article', category: 'Therapy', status: 'Published', views: 2100, rating: 4.9, triggers: ['negative', 'failure', 'sad'] },
  ]);

  const filteredData = resources.filter(item => {
    if (tabValue === 0) return true;
    const types = ['all', 'article', 'exercise', 'video'];
    return item.type === types[tabValue];
  });

  return (
    <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#102a43' }}>Mind Mate Pro</Typography>
          <Typography color="textSecondary">Manage Chatbot Triggers and Content Engagement</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ borderRadius: '10px', px: 3, py: 1.2, fontWeight: 700, bgcolor: '#3b82f6', textTransform: 'none' }}
        >
          Create New Resource
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 4, overflow: 'hidden', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 3, bgcolor: 'white', borderBottom: 1, borderColor: '#eee' }}>
          <Tab label="Articles" sx={{ fontWeight: 700, textTransform: 'none' }} />
          <Tab label="Exercises" sx={{ fontWeight: 700, textTransform: 'none' }} />
          <Tab label="Video Recs" sx={{ fontWeight: 700, textTransform: 'none' }} />
        </Tabs>

        <Table>
        </Table>
      </Card>

      {/* CREATE POPUP WITH TRIGGER INPUT */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800, color: 'rgb(16, 42, 67)' }}>Create Mind Mate Resource</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={6} >
              <TextField select label="Resource Type" fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}>
                <MenuItem value="article">Psychiatry Article</MenuItem>
                <MenuItem value="exercise">Guided Exercise</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select label="Category" fullWidth defaultValue="Anxiety">
                <MenuItem value="Anxiety">Anxiety</MenuItem>
                <MenuItem value="Depression">Depression</MenuItem>
                <MenuItem value="Wellness">Wellness</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}><TextField label="Resource Title" fullWidth /></Grid>

            {/* TRIGGER INPUT FIELD */}
            {/* <Grid item xs={12}>
              <TextField
                label="Chatbot Trigger Keywords"
                placeholder="e.g. panic, crying, lonely (separate with commas)"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Target size={18} color="#3b82f6" /></InputAdornment>,
                }}
                helperText="Mind Mate will show this resource when users type these words."
              />
            </Grid> */}

            <Grid item xs={12}><TextField label="Link or Content Body" multiline rows={4} fullWidth /></Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, mb: 1 }}>
            <Button onClick={() => setIsDialogOpen(false)} sx={{ fontWeight: 700 }}>Cancel</Button>
            <Button variant="contained" onClick={() => setIsDialogOpen(false)} sx={{ borderRadius: 2, px: 4, fontWeight: 700, bgcolor: '#3b82f6' }}>Publish to Bot</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}