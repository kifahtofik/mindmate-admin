import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Stack,
  Alert,
} from "@mui/material";
import { Plus, CloudUpload } from "lucide-react";

export function ContentManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "video",
    category: "Anxiety",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!file || !form.title) {
      setError("Title and media file are required");
      return;
    }

    const payload = new FormData();
    payload.append("video", file); 
    payload.append("title", form.title);
    payload.append("description", form.description);

    try {
      setLoading(true);
       res = await fetch("http://localhost:3000/video/upload", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Upload failed");

      setSuccess("Media uploaded successfully 🎉");
      setForm({ title: "", description: "", type: "video", category: "Anxiety" });
      setFile(null);
    } catch (err) {
      setError("Failed to upload media");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={900}>
          Mind Mate Admin
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setIsDialogOpen(true)}
        >
          Upload Content
        </Button>
      </Stack>

      <Card>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Videos" />
          <Tab label="Audio" />
        </Tabs>
      </Card>

      {/* DIALOG */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              fullWidth
            />

            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <MenuItem value="Anxiety">Anxiety</MenuItem>
              <MenuItem value="Depression">Depression</MenuItem>
              <MenuItem value="Wellness">Wellness</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "Select Video / Audio"}
              <input
                type="file"
                hidden
                accept="video/*,audio/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}