import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Card,
    CardContent,
    IconButton,
    Typography,
    Box,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { deleteTask, updateTask } from "../api/tasks";
import {
    statusOptions,
    statusColors,
    statusOptionsFilter,
} from "../constants/commons";
const TaskItemSortable = ({
    task,
    index,
    statusFilter,
    onDeleted,
    onTaskChanged,
}) => {
    const [status, setStatus] = useState(task.status);

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: String(task.id) });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: "10px",
    };

    const handleDelete = async () => {
        await deleteTask(task.id);
        if (onDeleted) onDeleted(task.id, task.order);
    };

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        try {
            await updateTask(task.id, { ...task, status: newStatus });
            if (statusFilter !== statusOptionsFilter.all) {
                onTaskChanged();
            }
        } catch (error) {
            console.error("Error updating task status", error);
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Card>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Drag handle */}
                        <Box
                            {...listeners}
                            sx={{
                                cursor: "grab",
                                display: "flex",
                                alignItems: "center",
                                mr: 2,
                            }}
                        >
                            {statusFilter === statusOptionsFilter.all && (
                                <DragIndicatorIcon />
                            )}
                        </Box>

                        {/* index and title */}
                        <Typography
                            variant="body2"
                            sx={{
                                width: "100px",
                                mr: -3,
                                fontWeight: "bold",
                            }}
                        >
                            {"Task #" + (index + 1) + "."}
                        </Typography>

                        <Box maxWidth="75%">
                            <Tooltip title={task.title}>
                                <Typography
                                    variant="subtitle1"
                                    noWrap
                                    sx={{
                                        textDecoration:
                                            status ===
                                            statusOptionsFilter.completed
                                                ? "line-through"
                                                : "none",
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            </Tooltip>

                            <FormControl size="small" sx={{ marginTop: 1 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    sx={{
                                        minWidth: 150,
                                        color: statusColors[status],
                                    }}
                                >
                                    {statusOptions.map((opt) => (
                                        <MenuItem
                                            key={opt}
                                            value={opt}
                                            sx={{
                                                color: statusColors[opt],
                                            }}
                                        >
                                            {opt
                                                .replace("_", " ")
                                                .toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* delete button */}
                    {statusFilter === statusOptionsFilter.all && (
                        <IconButton onClick={handleDelete} color="error">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskItemSortable;
