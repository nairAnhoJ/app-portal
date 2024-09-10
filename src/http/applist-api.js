import axios from "@/axios";

const resource = '/app-portal/app-list';

export const appListIndex = () => axios.get(resource);

export const createAppList = (app) => axios.post(resource, app);

export const editAppList = (id) => axios.get(`${resource}/${id}/edit`);

export const updateAppList = (id, app) => axios.put(`${resource}/${id}`, app);

export const deleteAppList = (id) => axios.delete(`${resource}/${id}`);

// export const resetUser = (id) => axios.patch(`${resource}/${id}/reset`);