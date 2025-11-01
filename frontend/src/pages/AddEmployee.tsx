import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const linkStyle = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200 ${
      pathname === path ? 'bg-white text-black' : 'text-white hover:bg-blue-600'
    }`;

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
      const errorMessage =
        err instanceof Error ? err.message : 'Server error';
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow-lg w-full rounded-b-lg fixed top-0 left-0 z-50">
        <div className="px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">Employee Manager</h1>
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <div className="hidden md:flex gap-4">
            <Link to="/home" className={linkStyle('/home')}>
              <FaHome /> Home
            </Link>
            <Link to="/employees" className={linkStyle('/employees')}>
              <FaUsers /> Employees
            </Link>
            <Link to="/add" className={linkStyle('/add')}>
              <FaUserPlus /> Add Employee
            </Link>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-2">
            <Link to="/home" className={linkStyle('/home')}>
              <FaHome /> Home
            </Link>
            <Link to="/employees" className={linkStyle('/employees')}>
              <FaUsers /> Employees
            </Link>
            <Link to="/add" className={linkStyle('/add')}>
              <FaUserPlus /> Add Employee
            </Link>
          </div>
        )}
      </nav>

      {/* Form Card */}
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="max-w-xl mx-auto px-4 bg-white rounded-lg shadow-md p-6">
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
      </div>
    </div>
  );
};

export default AddEmployee;
