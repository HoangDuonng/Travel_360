const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Cho phép truy cập thư mục 'uploads' dưới dạng file tĩnh
app.use('/image', express.static(path.join(__dirname, '../image')));

// Route chính
app.get('/', (req, res) => {
    res.send('Hello from Express');
});

// Các route
app.use('/api/locations', require('./routes/locationRouter'));
app.use('/api/blogs', require('./routes/blogRouter'));

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



