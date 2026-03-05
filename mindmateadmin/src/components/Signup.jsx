import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Link,
  Alert
} from "@mui/material";
import { Mail, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/admin/register",
        {
          email: email,
          password: password
        }
      );

      setSuccess(res.data.message || "Admin created successfully");

      setEmail("");
      setPassword("");

      // redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)"
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          textAlign: "center",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
        }}
      >

        <Typography
          variant="h4"
          sx={{ fontWeight: 900, mb: 4 }}
        >
          MindMate Admin Signup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>

            <TextField
              label="Admin Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Minimum 8 characters"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key size={18} />
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.6,
                borderRadius: "12px",
                fontWeight: 800,
                textTransform: "none"
              }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                component="button"
                underline="hover"
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
            </Typography>

          </Stack>
        </form>

      </Paper>
    </Box>
  );
}