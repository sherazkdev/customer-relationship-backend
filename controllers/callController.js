import Call from '../models/Call.js';
import Customer from '../models/Customer.js';
import { validationResult } from 'express-validator';

// @desc    Get calls for a customer
// @route   GET /api/calls/:customerId
// @access  Public
export const getCallsByCustomer = async (req, res, next) => {
  try {
    const calls = await Call.find({ customerId: req.params.customerId })
      .sort({ callTime: -1 })
      .populate('customerId', 'name phone email')
      .lean();
    
    res.json({
      success: true,
      data: calls
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create call
// @route   POST /api/calls
// @access  Public
export const createCall = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { customerId, status, message, callTime } = req.body;

    // Verify customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const call = new Call({
      customerId,
      status,
      message,
      callTime: callTime ? new Date(callTime) : new Date(),
      createdBy: req.user?._id
    });

    const savedCall = await call.save();

    // Update customer status based on call status
    await Customer.findByIdAndUpdate(customerId, { status });

    // Populate customer data in response
    const populatedCall = await Call.findById(savedCall._id)
      .populate('customerId', 'name phone email')
      .lean();
    
    res.status(201).json({
      success: true,
      data: populatedCall
    });
  } catch (error) {
    next(error);
  }
};

