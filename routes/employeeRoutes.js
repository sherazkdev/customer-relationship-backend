import express from 'express';
import { body } from 'express-validator';
import { listEmployees, createEmployee } from '../controllers/employeeController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

const employeeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'employee']).withMessage('Invalid role')
];

router.get('/', protect, adminOnly, listEmployees);
router.post('/', protect, adminOnly, employeeValidation, createEmployee);

export default router;

