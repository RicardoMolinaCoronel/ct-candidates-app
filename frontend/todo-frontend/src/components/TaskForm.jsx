import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createTask } from "../api/tasks";

const TaskForm = ({ onTaskCreated, taskOrder }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        await createTask({ title, status: "pending", order: taskOrder });
        setTitle("");
        onTaskCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" gap={2} marginBottom={2}>
                <TextField
                    label="New Task"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained">
                    Add
                </Button>
            </Box>
        </form>
    );
};

export default TaskForm;
