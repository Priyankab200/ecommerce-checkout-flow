import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // ✅ .env file साठी
import { sendConfirmationEmail } from './emailService.js';
import Order from './models/Order.js';

dotenv.config(); // ✅ .env variables लोड करतो

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // ✅ Email पाठवायचा call करताना complete object पास कर:
    await sendConfirmationEmail(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ MONGO_URI & PORT .env मधून घे
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
