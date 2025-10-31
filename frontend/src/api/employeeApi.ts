import axios from 'axios';
import type { Employee } from '../types/Employee';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchEmployees = () => axios.get<Employee[]>(API_URL);

export const createEmployee = (data: Employee) => axios.post<Employee>(API_URL, data);

export const updateEmployee = (id: string, data: Employee) =>
  axios.put<Employee>(`${API_URL}/${id}`, data);

export const deleteEmployee = (id: string) => axios.delete(`${API_URL}/${id}`);
