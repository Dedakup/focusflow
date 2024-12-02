// src/api/axiosInstance.js
import axios from 'axios';
import { API_CONFIG } from './config';

const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

export default apiClient;
