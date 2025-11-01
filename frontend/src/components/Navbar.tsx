// // import { Link, useLocation } from 'react-router-dom';

// // const Navbar = () => {
// //   const { pathname } = useLocation();

// //   const linkStyle = (path: string) =>
// //     `px-4 py-2 rounded-md font-medium ${
// //       pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
// //     }`;

// //   return (
// //     <nav className="bg-white shadow-md mb-6">
// //       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
// //         <h1 className="text-xl font-bold text-blue-700">Employee Manager</h1>
// //         <div className="flex gap-4">
// //           <Link to="/home" className={linkStyle('/home')}>
// //             Home
// //           </Link>
// //           <Link to="/employees" className={linkStyle('/employees')}>
// //             Employees
// //           </Link>
// //           <Link to="/add" className={linkStyle('/add')}>
// //             Add Employee
// //           </Link>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';

// const Navbar = () => {
//   const { pathname } = useLocation();

//   const linkStyle = (path: string) =>
//     `flex items-center gap-2 px-4 py-2 rounded-md font-medium ${
//       pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
//     }`;

//   return (
//     <nav className="bg-white shadow-md mb-6">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-700">Employee Manager</h1>
//         <div className="flex gap-4">
//           <Link to="/home" className={linkStyle('/home')}>
//             <FaHome /> Home
//           </Link>
//           <Link to="/employees" className={linkStyle('/employees')}>
//             <FaUsers /> Employees
//           </Link>
//           <Link to="/add" className={linkStyle('/add')}>
//             <FaUserPlus /> Add Employee
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
