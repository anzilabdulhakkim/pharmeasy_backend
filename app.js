const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const otpRoutes = require('./routes/otpRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

// Set up routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/otp', otpRoutes);
app.use('/cart', cartRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('Server is up and running');
});

// Start the server
app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server running on port ${PORT} and connected to MongoDB.`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});

