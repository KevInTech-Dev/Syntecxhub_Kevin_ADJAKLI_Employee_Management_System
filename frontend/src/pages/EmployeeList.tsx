import { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee } from '../api/employeeApi';
import type { Employee } from '../types/Employee';
import EmployeeCard from '../components/EmployeeCard';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { pathname } = useLocation();

  const linkStyle = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200 ${
      pathname === path ? 'bg-white text-black' : 'text-white hover:bg-blue-600'
    }`;

  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      setEmployees(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch employees.' });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteEmployee(confirmId);
      setEmployees((prev) => prev.filter((emp) => emp._id !== confirmId));
      setMessage({ type: 'success', text: 'Employee deleted successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete employee.' });
    } finally {
      setConfirmId(null);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-md text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Employee list */}
        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div className="grid gap-4">
            {employees.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} onDelete={() => setConfirmId(emp._id)} />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
