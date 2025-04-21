import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Avatar,
    Grid,
    CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = ({ onLoginSuccess }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await login(form);
            localStorage.setItem("token", res.data.token);
            onLoginSuccess();
        } catch (err) {
            setError("Login failed. Check credentials.");
        }
        setIsLoading(false);
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar
                    sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                        textAlign: "center",
                        mb: 1,
                    }}
                >
                    <LockOutlinedIcon
                        sx={{ color: (theme) => theme.palette.common.white }}
                    />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center" }}
                >
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        sx={{ mt: 2, height: 40 }} // opcional, altura fija
                    >
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Box>
                <Grid container justifyContent="end" sx={{ mt: 1 }}>
                    <Grid item>
                        <Box mt={1}>
                            <Button onClick={() => navigate("/register")}>
                                Sign Up
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Login;
