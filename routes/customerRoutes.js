import express from 'express';
import { body } from 'express-validator';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomerStatus
} from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Validation rules
const customerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('visitTime').optional().isISO8601().withMessage('Please enter a valid date'),
  body('note').optional().trim()
];

// Routes
router.get('/', protect, getCustomers);
router.get('/:id', protect, getCustomer);
router.post('/', protect, customerValidation, createCustomer);
router.patch('/:id', protect, updateCustomerStatus);

export default router;
