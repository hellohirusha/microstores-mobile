const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const buyerRoutes = require('./routes/buyer');
const sellerRoutes = require('./routes/seller');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/buyer', buyerRoutes);
app.use('/seller', sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
