import { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee } from '../api/employeeApi';
import type { Employee } from '../types/Employee';
import EmployeeCard from '../components/EmployeeCard';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="grid gap-4">
          {employees.map((emp) => (
            
            <EmployeeCard employee={emp} onDelete={handleDelete} />

          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
