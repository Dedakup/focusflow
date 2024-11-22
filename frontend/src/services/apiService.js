import axios from "axios";
import { API_BASE_URL } from "./config";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Authorization Header for Protected Endpoints
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Example API Methods
export const createTask = (task) => apiClient.post("/tasks", task);
export const getTasks = () => apiClient.get("/tasks");
export const updateTask = (taskId, updates) => apiClient.put(`/tasks/${taskId}`, updates);
export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);
export const login = (credentials) => apiClient.post("/auth/login", credentials);
export const signup = (userInfo) => apiClient.post("/auth/signup", userInfo);

export default apiClient;
