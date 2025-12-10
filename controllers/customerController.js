import Customer from '../models/Customer.js';
import { validationResult } from 'express-validator';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ visitTime: -1 }).lean();
    
    res.json({
      success: true,
      data: customers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Public
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    
    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create customer
// @route   POST /api/customers
// @access  Public
export const createCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, phone, email, note, visitTime } = req.body;

    const customer = new Customer({
      name,
      phone,
      email: email && email.trim() ? email.trim() : undefined,
      note: note || '',
      visitTime: visitTime ? new Date(visitTime) : new Date(),
      createdBy: req.user?._id
    });

    const savedCustomer = await customer.save();
    
    res.status(201).json({
      success: true,
      data: savedCustomer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer status
// @route   PATCH /api/customers/:id
// @access  Public
export const updateCustomerStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (status && !['new', 'noresponse', 'cancelled', 'buyed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    
    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

