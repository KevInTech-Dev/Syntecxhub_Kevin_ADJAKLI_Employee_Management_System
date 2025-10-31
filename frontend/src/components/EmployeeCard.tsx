import type { Employee } from '../types/Employee';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTie,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

interface Props {
  employee: Employee;
  onDelete: (id: string) => void;
}

const EmployeeCard = ({ employee, onDelete }: Props) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition bg-white">
      <div className="flex items-center gap-4">
        {employee.image ? (
          <a
            href={`http://localhost:5000/uploads/${employee.image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://localhost:5000/uploads/${employee.image}`}
              alt={employee.name}
              className="w-16 h-16 rounded-full object-cover border hover:scale-105 transition-transform"
            />
          </a>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-600">Position: {employee.position}</p>
          <p className="text-sm text-gray-600">Salary: ${employee.salary}</p>
          <p className="text-sm text-gray-600">Department: {employee.department}</p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="grid gap-2 text-sm text-gray-700">
        {employee.role && (
          <p className="flex items-center gap-2">
            <FaUserTie /> Role: {employee.role}
          </p>
        )}
        {employee.email && (
          <p className="flex items-center gap-2">
            <FaEnvelope /> Email: {employee.email}
          </p>
        )}
        {employee.phone && (
          <p className="flex items-center gap-2">
            <FaPhone /> Phone: {employee.phone}
          </p>
        )}
        {employee.address && (
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Address: {employee.address}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/edit/${employee._id}`}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          <FaEdit /> Edit
        </Link>
        <button
          onClick={() => onDelete(employee._id!)}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
