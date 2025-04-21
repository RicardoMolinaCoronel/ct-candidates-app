import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_API_URL+'/tasks';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
};

export const getTasks = (params = {}) =>
    axios.get(API_URL, { params, headers: getAuthHeaders() });

export const getTaskById = (id) =>
    axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });

export const createTask = (data) =>
    axios.post(API_URL, data, { headers: getAuthHeaders() });

export const updateTask = (id, data) =>
    axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeaders() });

export const deleteTask = (id) =>
    axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
