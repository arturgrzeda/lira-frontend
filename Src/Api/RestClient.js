"use server";
import axios from 'axios';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 20000;

export const get = (path, auth) => axios.get(path, auth);
export const del = (path, auth) => axios.delete(path, auth);
export const post = (path, data, auth) => axios.post(path, data, auth);
export const put = (path, data, auth) => axios.put(path, data, auth);
export const patch = (path, data, auth) => axios.patch(path, data, auth);
