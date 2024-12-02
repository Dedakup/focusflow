import { toast } from 'react-toastify';

export const notifySuccess = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warning(message);
export const notifyInfo = (message) => toast.info(message);
