const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', getAllEmployees);
router.post('/add', upload.single('image'), createEmployee);
router.put('/:id', upload.single('image'), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
