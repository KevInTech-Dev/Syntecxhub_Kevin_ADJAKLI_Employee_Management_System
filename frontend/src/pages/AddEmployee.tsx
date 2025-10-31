import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: 0,
    department: '',
    role: '',
    email: '',
    phone: '',
    address: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || formData.salary <= 0) {
      setError('Name, position, and salary are required');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await axios.post('http://localhost:5000/api/employees/add', data);
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
      <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
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

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="border px-3 py-2 rounded-md w-full" />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
