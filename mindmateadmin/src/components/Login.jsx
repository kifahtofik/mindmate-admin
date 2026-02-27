import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, InputAdornment } from "@mui/material";
import { Shield, Mail, Key } from 'lucide-react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if( email && password){
      onLogin();
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
    }}>
      <Paper elevation={0} sx={{ 
        p: 5, width: '100%', maxWidth: 420, borderRadius: '24px', 
        border: '1px solid #e2e8f0', textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
  
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#1e293b' }}>
          MindMate Admin
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
        Health Dashboard Access
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField 
              fullWidth label="Admin Email" 
              required
              type="email"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ 
                startAdornment: <InputAdornment position="start"><Mail size={18} color="#64748b"/></InputAdornment> 
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField 
              fullWidth label="Password" type="password" 
              required
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ 
                startAdornment: <InputAdornment position="start"><Key size={18} color="#64748b"/></InputAdornment> 
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <Button 
              fullWidth size="large" variant="contained" type="submit"
              sx={{ 
                py: 1.8, borderRadius: '12px', fontWeight: 800, 
                textTransform: 'none', fontSize: '1rem', bgcolor: '#2563eb' 
              }}
            >
              Sign In 
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}