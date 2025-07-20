import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        base_url + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(to right, #ece9e6, #ffffff)"
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          width: 380,
          borderRadius: 4,
          background: "#fff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" textAlign="center" className="text-gray-700" mb={2} fontWeight={600}>
          Welcome Back 👋
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Please login to your account
        </Typography>

        {error && (
          <Typography variant="body2" color="error" mb={2} textAlign="center" className="capitalize">
            {error +" "+"Please try again"}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={1} mb={3}>
            <Link to="/signup" style={{ fontSize: "14px", color: "#4f46e5", fontWeight: "500" }}>
              Don't have an account? Sign Up
            </Link>
          </Box>

          <Button type="submit" variant="contained" fullWidth size="large">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
