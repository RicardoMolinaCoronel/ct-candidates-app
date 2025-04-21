import React, { useState } from "react";
import { Button, Box, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import TaskList from "../TaskList";

const TasksWrapper = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        await logout(token);
        localStorage.removeItem("token");
        navigate("/login");
        setIsLoading(false);
    };

    return (
        <Paper
            elevation={10}
            sx={{ marginTop: 6, marginBottom: 6, padding: 3 }}
        >
            <Box position="relative" mb={2}>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={isLoading}
                    onClick={handleLogout}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        minWidth: 80,
                    }}
                >
                    {isLoading ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        "Logout"
                    )}
                </Button>

                <h2 style={{ margin: 0, paddingTop: 30 }}>To Do List</h2>
            </Box>
            <TaskList />
        </Paper>
    );
};

export default TasksWrapper;
