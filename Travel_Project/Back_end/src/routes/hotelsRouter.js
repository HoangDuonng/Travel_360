const express = require('express');
const multer = require('multer');
const router = express.Router();
const Hotel = require('../models/Hotels');

// Cấu hình multer
const upload = multer({ dest: 'image/' }); // Đường dẫn để lưu file upload

// Route tạo khách sạn mới
router.post('/', upload.single('image'), async (req, res) => {
  const hotel = new Hotel({
    name: req.body.name,
    image: req.file.filename, // Lưu tên file đã được upload
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
  });

  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route để lấy tất cả khách sạn (GET)
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find(); // Lấy tất cả khách sạn từ cơ sở dữ liệu
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route để cập nhật thông tin khách sạn (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Tìm khách sạn theo ID

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' }); // Nếu không tìm thấy khách sạn
    }

    // Cập nhật thông tin khách sạn
    hotel.name = req.body.name || hotel.name;
    hotel.image = req.file ? req.file.filename : hotel.image; // Nếu có file mới, cập nhật tên file
    hotel.description = req.body.description || hotel.description;
    hotel.price = req.body.price || hotel.price;
    hotel.location = req.body.location || hotel.location;

    const updatedHotel = await hotel.save(); // Lưu khách sạn đã cập nhật
    res.status(200).json(updatedHotel); // Trả về khách sạn đã cập nhật
  } catch (err) {
    res.status(500).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

// Route để xóa khách sạn (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Tìm khách sạn theo ID

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' }); // Nếu không tìm thấy khách sạn
    }

    await Hotel.findByIdAndDelete(req.params.id); // Xóa khách sạn
    res.status(204).send(); // Trả về status 204 No Content
  } catch (err) {
    res.status(500).json({ message: err.message }); // Trả về lỗi nếu có
  }
});

module.exports = router;
