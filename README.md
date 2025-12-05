# Backend API - Customer Tracking System

Express.js backend with MongoDB, using ES Modules and MVC architecture.

## Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── customerController.js # Customer business logic
│   └── callController.js     # Call business logic
├── middlewares/
│   └── errorHandler.js       # Error handling middleware
├── models/
│   ├── Customer.js           # Customer Mongoose model
│   └── Call.js               # Call Mongoose model
├── routes/
│   ├── customerRoutes.js     # Customer API routes
│   └── callRoutes.js         # Call API routes
├── .env                      # Environment variables
├── package.json
└── server.js                 # Express server entry point
```

## Models

### Customer
- `name` (String, required)
- `phone` (String, required)
- `email` (String, required, validated)
- `visitTime` (Date, auto-generated)
- `status` (Enum: 'new', 'no-response', 'cancelled', 'buyed', default: 'new')
- `note` (String, optional)

### Call
- `customerId` (ObjectId, ref: Customer, required)
- `status` (Enum: 'no-response', 'cancelled', 'buyed', required)
- `message` (String, required)
- `callTime` (Date, auto-generated)

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/customer-tracking
NODE_ENV=development
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

