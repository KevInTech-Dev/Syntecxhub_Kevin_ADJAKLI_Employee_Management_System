// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';
// import axios from 'axios';

// const Home = () => {
//   const [employeeCount, setEmployeeCount] = useState<number>(0);
//   const navigate = useNavigate();

//   const fetchCount = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/employees/count');
//       setEmployeeCount(res.data.count);
//     } catch (err: unknown) {
//   if (axios.isAxiosError(err)) {
//     setError(err.response?.data?.message || 'Server error');
//   } else {
//     setError('Unexpected error');
//   }
// }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('authEmail');
//     navigate('/');
//   };

//   useEffect(() => {
//     fetchCount();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto px-4">
//       <h2 className="text-3xl font-bold mb-6 text-blue-700">Welcome to Employee Manager</h2>
//       <p className="mb-4 text-gray-700">
//         This system helps you manage employees efficiently with secure access, structured forms, and real-time data.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4">
//           <FaUsers className="text-3xl text-blue-600" />
//           <div>
//             <p className="text-lg font-semibold">Total Employees</p>
//             <p className="text-2xl">{employeeCount}</p>
//           </div>
//         </div>

//         <div
//           onClick={() => navigate('/add')}
//           className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 cursor-pointer hover:bg-gray-100"
//         >
//           <FaUserPlus className="text-3xl text-green-600" />
//           <div>
//             <p className="text-lg font-semibold">Add New Employee</p>
//             <p className="text-sm text-gray-600">Click to open the form</p>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//       >
//         <FaSignOutAlt />
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Home;

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function setError(_arg0: unknown) {
//     throw new Error('Function not implemented.');
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployeeCount(res.data.length);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Server error');
      } else {
        setError('Unexpected error');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authEmail');
    navigate('/');
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Welcome to Employee Manager</h2>
      <p className="mb-4 text-gray-700">
        This system helps you manage employees efficiently with secure access, structured forms, and real-time data.
      </p>

      {error && (
        <p className="text-red-600 mb-4 font-medium">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md p-4 rounded-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <p className="text-lg font-semibold">Total Employees</p>
            <p className="text-2xl">{employeeCount}</p>
          </div>
        </div>

        <div
          onClick={() => navigate('/add')}
          className="bg-white shadow-md p-4 rounded-md flex items-center gap-4 cursor-pointer hover:bg-gray-100"
        >
          <FaUserPlus className="text-3xl text-green-600" />
          <div>
            <p className="text-lg font-semibold">Add New Employee</p>
            <p className="text-sm text-gray-600">Click to open the form</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Home;
