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
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

 const [menuOpen, setMenuOpen] = useState(false);

const linkStyle = (path: string) =>
  `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition duration-200 ${
    pathname === path
      ? 'bg-white text-black'
      : 'text-white hover:bg-blue-600'
  }`;



  return (
    <div>
      {/* className="max-w-6xl mx-auto px-4" */}
      {/* ✅ Navbar intégré ici */}
      <div className="w-full">
  <nav className="bg-blue-700 shadow-lg w-full rounded-b-lg fixed top-0 left-0 z-50">
    <div className="px-6 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white tracking-wide">Employee Manager</h1>

      {/* Hamburger visible sur mobile */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Liens visibles sur desktop */}
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

    {/* Menu mobile visible si menuOpen est true */}
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
</div>


    
      {/* ✅ Contenu principal */}
      <div className="max-w-30xl mx-auto px-20 mt-10 pt-20">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Welcome to Employee Manager</h2>      <p className="mb-4 text-gray-700">
        This system helps you manage employees efficiently with secure access, structured forms, and real-time data.
      </p>

      {error && (
        <p className="text-red-600 mb-4 font-medium">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-10">
        <div className="bg-white shadow-lg p-4 rounded-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <p className="text-lg font-semibold">Total Employees</p>
            <p className="text-2xl">{employeeCount}</p>
          </div>
        </div>

        <div
          onClick={() => navigate('/add')}
          className="bg-white shadow-lg p-4 rounded-md flex items-center gap-4 cursor-pointer hover:bg-gray-100"
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
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 mt-10 rounded-md hover:bg-red-700"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
    </div>

      
  );
};

export default Home;
