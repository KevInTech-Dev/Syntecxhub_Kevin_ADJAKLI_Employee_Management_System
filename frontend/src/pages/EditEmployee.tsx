import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEmployees, updateEmployee } from '../api/employeeApi';
import type { Employee } from '../types/Employee';
import axios from 'axios'

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employee>({
    name: '',
    position: '',
    salary: 0,
    department: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    image: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const response = await fetchEmployees();
        const employee = response.data.find((emp) => emp._id === id);
        if (employee) {
          setFormData(employee);
        } else {
          setError('Employee not found');
        }
      } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || 'Server error');
  } else {
    setError('Unexpected error');
  }
}
    };
    loadEmployee();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || formData.salary <= 0) {
      setError('Name, position, and salary are required');
      return;
    }

    try {
      await updateEmployee(id!, formData);
      navigate('/employees');
   } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || 'Server error');
  } else {
    setError('Unexpected error');
  }
}
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="border px-3 py-2 rounded-md" />

        <select name="role" value={formData.role} onChange={handleChange} className="border px-3 py-2 rounded-md">
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="HR">HR</option>
        </select>

        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border px-3 py-2 rounded-md" />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border px-3 py-2 rounded-md" />

        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
