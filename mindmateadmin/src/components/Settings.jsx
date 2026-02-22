import React, { useState } from 'react';
import {
  Box, Typography, Card, Grid, Button, Chip, Stack,
  Alert, Switch, List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, Paper, Tabs, Tab, TextField
} from "@mui/material";
import {
  Shield, Lock, FileText, Database, 
  Settings as SettingsIcon, Globe, Languages, Calendar
} from 'lucide-react';

export function Settings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
          Settings & Compliance
        </Typography>
        <Typography color="textSecondary">
          Manage privacy, Ethiopian regulatory compliance, and localization (አማርኛ)
        </Typography>
      </Box>

      {/* Compliance Alert */}
      <Alert 
        icon={<Shield size={20} />} 
        sx={{ 
          mb: 4, 
          borderRadius: '12px', 
          bgcolor: '#eff6ff', 
          color: '#1e40af', 
          border: '1px solid #dbeafe',
          '& .MuiAlert-icon': { color: '#3b82f6' }
        }}
      >
        <strong>Local Compliance:</strong> MindMate is configured to follow the 
        <strong> FDRE Personal Data Protection Proclamation (1205/2020)</strong>. 
        All Amharic and English user data is encrypted locally.
      </Alert>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '0.95rem' }
        }}>
          <Tab label="Privacy & Data" />
          <Tab label="General & Localization" />
        </Tabs>
      </Box>

      {/* TAB 1: PRIVACY & DATA */}
      {tabValue === 0 && (
        <Stack spacing={3}>
          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Lock size={20} color="#64748b" />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Data Privacy Settings</Typography>
                <Typography variant="body2" color="textSecondary">Control how MindMate handles Ge'ez and English inputs</Typography>
              </Box>
            </Box>
            
            <List disablePadding>
              <SettingToggle label="End-to-End Encryption" sub="Encrypt all Amharic journal entries and personal notes" checked disabled />
              <Divider sx={{ my: 1 }} />
              <SettingToggle label="Anonymous Analytics" sub="Anonymize usage data for Ethiopian region" checked />
              <Divider sx={{ my: 1 }} />
              <SettingToggle label="Multi-script Search" sub="Allow searching data using both Amharic and English scripts" checked />
              <Divider sx={{ my: 1 }} />
              <SettingToggle label="Automated Data Deletion" sub="Delete inactive user data after 1 year" checked />
            </List>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Database size={20} color="#64748b" />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Data Retention (Ethiopia Node)</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><RetentionInput label="User Profile" value="Lifetime" /></Grid>
              <Grid item xs={12} md={6}><RetentionInput label="Journal Content" value="Lifetime" /></Grid>
              <Grid item xs={12} md={6}><RetentionInput label="Audit Logs" value="2 Years (Proclamation Requirement)" /></Grid>
              <Grid item xs={12} md={6}><RetentionInput label="Support History" value="1 Year" /></Grid>
            </Grid>
          </Card>
        </Stack>
      )}

      {/* TAB 2: COMPLIANCE */}
      {tabValue === 1 && (
        <Stack spacing={3}>
          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Regulatory Status</Typography>
            <Stack spacing={2}>
              <ComplianceRow name="FDRE Proclamation 1205/2020" desc="Ethiopian Personal Data Protection" status="Compliant" />
              <ComplianceRow name="InSA Security Guidelines" desc="Information Network Security Agency" status="Certified" />
              <ComplianceRow name="Ministry of Innovation" desc="Tech Startup Compliance" status="Active" />
            </Stack>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Export Documents</Typography>
            <Stack spacing={1}>
              <Button variant="outlined" fullWidth sx={actionBtnStyle} startIcon={<FileText size={18}/>}>Download Data Privacy Impact Assessment (DPIA)</Button>
              <Button variant="outlined" fullWidth sx={actionBtnStyle} startIcon={<Shield size={18}/>}>InSA Security Audit Report</Button>
            </Stack>
          </Card>
        </Stack>
      )}

      {/* TAB 3: GENERAL & LOCALIZATION */}
      {tabValue === 2 && (
        <Stack spacing={3}>
          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SettingsIcon size={20} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Regional Configuration</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label="App Name" defaultValue="MindMate Ethiopia" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Support Number" defaultValue="+251 (Local Support)" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Crisis Hotline" defaultValue="818" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Default Timezone" defaultValue="GMT+3 (East Africa Time)" /></Grid>
            </Grid>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Languages size={20} color="#3b82f6" />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Language & Script (አማርኛ)</Typography>
            </Box>
            <SettingToggle label="Amharic Chatbot Interface" sub="Enable full Ge'ez script support for AI responses" checked />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>ACTIVE LANGUAGES</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Amharic (አማርኛ)" color="primary" sx={{ fontWeight: 700 }} />
                <Chip label="English" variant="outlined" />
                <Chip label="Oromiffa" variant="outlined" />
                <Chip label="Tigrinya" variant="outlined" />
              </Stack>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: '16px', p: 3 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Calendar size={20} color="#3b82f6" />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Calendar Preference</Typography>
            </Box>
            <SettingToggle label="Ethiopian Calendar" sub="Use Ge'ez Calendar (Pagumen support) for internal reports" checked />
          </Card>
        </Stack>
      )}
    </Box>
  );
}

// --- Helper Components ---

const actionBtnStyle = { 
  justifyContent: 'flex-start', textTransform: 'none', fontWeight: 600, py: 1.2, 
  borderRadius: '8px', color: '#475569', borderColor: '#e2e8f0'
};

function SettingToggle({ label, sub, checked = false, disabled = false }) {
  return (
    <ListItem disableGutters>
      <ListItemText 
        primary={<Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{label}</Typography>}
        secondary={sub}
      />
      <ListItemSecondaryAction>
        <Switch edge="end" defaultChecked={checked} disabled={disabled} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function RetentionInput({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 0.5, display: 'block' }}>{label}</Typography>
      <TextField fullWidth size="small" value={value} disabled />
    </Box>
  );
}

function ComplianceRow({ name, desc, status }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc' }}>
      <Box>
        <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
        <Typography variant="body2" color="textSecondary">{desc}</Typography>
      </Box>
      <Chip label={status} size="small" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 700, border: '1px solid #bbf7d0' }} />
    </Paper>
  );
}