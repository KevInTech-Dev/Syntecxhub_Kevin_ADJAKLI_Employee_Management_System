const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};

// @desc    Create a new employee
// @route   POST /api/employees/add
// @access  Public
const createEmployee = async (req, res) => {
  const {
    name,
    position,
    salary,
    department,
    role,
    email,
    phone,
    address,
  } = req.body;

  if (!name || !position || salary == null) {
    return res.status(400).json({ message: 'Name, position, and salary are required' });
  }

  try {
    const image = req.file ? req.file.filename : null;

    const newEmployee = new Employee({
      name,
      position,
      salary,
      department,
      role,
      email,
      phone,
      address,
      image,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create employee', error: error.message });
  }
};

// @desc    Update an existing employee
// @route   PUT /api/employees/:id
// @access  Public
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    position,
    salary,
    department,
    role,
    email,
    phone,
    address,
  } = req.body;

  try {
    const updateData = {
      name,
      position,
      salary,
      department,
      role,
      email,
      phone,
      address,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
