import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEmployees, updateEmployee } from '../api/employeeApi';
import type { Employee } from '../types/Employee';
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';

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
  const [menuOpen, setMenuOpen] = useState(false);
const { pathname } = useLocation();

const linkStyle = (path: string) =>
  `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200 ${
    pathname === path
      ? 'bg-white text-black'
      : 'text-white hover:bg-blue-600'
  }`;


  return (
    <div className="w-full">
  <nav className="bg-blue-700 shadow-lg w-full rounded-b-lg fixed top-0 left-0 z-50">
    <div className="px-6 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white tracking-wide">Employee Manager</h1>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
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

  {/* ✅ Contenu principal décalé */}
  {/* </div><div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg pt-24"> */}
    {/* <div className="max-w-xl mx-auto px-4 bg-white rounded-lg shadow-md p-6"> */}
    {/* Ton contenu ici */}
    <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="max-w-xl mx-auto px-4 bg-white rounded-lg shadow-md p-6">
    {/* <div className="max-w-xl mx-auto px-4"> */}
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

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Update Employee
        </button>
      </form>
    </div>
  </div>
</div>

    
  );
};

export default EditEmployee;
