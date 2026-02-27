import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  MenuItem,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const VIDEO_API = "http://localhost:3000/video/upload";
const AUDIO_API = "http://localhost:3000/audio/upload";

export function ContentManagement() {
  const [type, setType] = useState("video");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUpload = async () => {
    if (!file || !title) {
      return setMessage({ type: "error", text: "File and title are required" });
    }

    const formData = new FormData();
    formData.append(type, file); // 🔥 MUST match multer field name
    formData.append("title", title);
    formData.append("description", description);

    const url = type === "video" ? VIDEO_API : AUDIO_API;

    try {
      setLoading(true);
      setMessage(null);

      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 600000, 
      });

      setMessage({ type: "success", text: `${type} uploaded successfully` });
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Upload Media
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        {/* Media Type */}
        <TextField
          select
          label="Media Type"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
        </TextField>

        {/* Title */}
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Description */}
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* File Input */}
        <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
          Select {type}
          <input
            hidden
            type="file"
            accept={type === "video" ? "video/*" : "audio/*"}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected: {file.name}
          </Typography>
        )}

        {/* Upload */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Card>
    </Box>
  );
}