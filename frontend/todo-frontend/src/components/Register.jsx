import React, { useState } from "react";
import {
    Container,
    Paper,
    Button,
    TextField,
    Typography,
    Grid,
    Box,
    CircularProgress,
} from "@mui/material";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
const Register = ({ onRegisterSuccess }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await register(form);
            localStorage.setItem("token", res.data.token);
            onRegisterSuccess();
        } catch (err) {
            setError("Registration failed. Please check the inputs.");
        }
        setIsLoading(false);
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Paper
                elevation={10}
                sx={{ marginTop: 6, marginBottom: 6, padding: 4 }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center" }}
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        sx={{ mt: 2, height: 40 }}
                    >
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </form>
                <Grid container justifyContent="end" sx={{ mt: 1 }}>
                    <Grid item>
                        <Box mt={1}>
                            <Button onClick={() => navigate("/login")}>
                                Go to Login
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Register;
