import express from 'express';
import { body } from 'express-validator';
import {
  getCallsByCustomer,
  createCall
} from '../controllers/callController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Validation rules
const callValidation = [
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('status').isIn(['noresponse', 'cancelled', 'buyed']).withMessage('Invalid call status'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// Routes
router.get('/:customerId', protect, getCallsByCustomer);
router.post('/', protect, callValidation, createCall);

export default router;
