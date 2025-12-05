import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer ID is required']
  },
  status: {
    type: String,
    enum: ['noresponse', 'cancelled', 'buyed'],
    required: [true, 'Call status is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  callTime: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Call', callSchema);
