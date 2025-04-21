import React, { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Divider,
    Typography,
    CircularProgress,
} from "@mui/material";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { getTasks, updateTask } from "../api/tasks";
import { statusOptionsFilter } from "../constants/commons";
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState(statusOptionsFilter.all);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        setError("");
        try {
            let params = {};
            params.orderBy = "order";
            params.direction = "asc";
            if (statusFilter !== statusOptionsFilter.all) {
                params.status = statusFilter;
            }

            const response = await getTasks(params);
            setTasks(response.data);
        } catch (err) {
            setError("Could not fetch tasks. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(); // eslint-disable-next-line
    }, [statusFilter, reload]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((t) => t.id === Number(active.id));
        const newIndex = tasks.findIndex((t) => t.id === Number(over.id));

        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        const listTasks = newTasks.map((t, i) => ({
            ...t,
            order: i,
        }));
        setTasks(listTasks);

        await Promise.all(
            newTasks.map((task, index) =>
                task.order !== index
                    ? updateTask(task.id, { order: index })
                    : Promise.resolve()
            )
        );
    };

    const onDltReorderAndSyncTasks = async (updatedTasks, taskOrder) => {
        setTasks(updatedTasks); // actualiza el estado local

        await Promise.all(
            updatedTasks.map((task, index) => {
                if (task.order >= taskOrder) {
                    return updateTask(task.id, { order: index });
                }
                return Promise.resolve();
            })
        );
    };

    return (
        <>
            <Box display="flex" gap={2} marginBottom={2}>
                <TextField
                    select
                    label="Filter by Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    fullWidth
                >
                    {Object.entries(statusOptionsFilter).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                            {value.replace("_", " ").toUpperCase()}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="outlined" onClick={() => setReload(!reload)}>
                    Refresh
                </Button>
            </Box>

            <Divider sx={{ marginBottom: 2 }} />

            {statusFilter === statusOptionsFilter.all && (
                <TaskForm
                    onTaskCreated={() => setReload(!reload)}
                    taskOrder={tasks.length}
                />
            )}

            {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" align="center" my={4}>
                    {error}
                </Typography>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={tasks.map((task) => String(task.id))}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={task.order}
                                statusFilter={statusFilter}
                                onDeleted={(id, taskOrder) => {
                                    const newTasks = tasks
                                        .filter((t) => t.id !== id)
                                        .map((t, i) => ({ ...t, order: i }));
                                    onDltReorderAndSyncTasks(
                                        newTasks,
                                        taskOrder
                                    );
                                }}
                                onTaskChanged={() => setReload(!reload)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </>
    );
};

export default TaskList;
