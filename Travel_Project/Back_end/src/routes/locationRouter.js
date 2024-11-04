// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Location = require('../models/Location');

// // Cấu hình Multer để lưu trữ file
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'image/'); // Thư mục lưu trữ file
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Tạo tên file duy nhất
//   },
// });

// const upload = multer({ storage: storage });

// // Route tạo địa điểm mới
// router.post('/', upload.single('image'), async (req, res) => {
//   const location = new Location({
//     name: req.body.name,
//     image: req.file ? req.file.filename : req.body.image, // Lưu tên file hình ảnh (hoặc URL nếu có)
//     description: req.body.description,
//   });

//   try {
//     const newLocation = await location.save();
//     res.status(201).json(newLocation);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Route để lấy tất cả địa điểm hoặc một địa điểm cụ thể (GET)
// router.get('/:id?', async (req, res) => {
//   try {
//     const { id } = req.params; // Lấy id từ params

//     if (id) {
//       // Nếu id có, tìm địa điểm theo id
//       const location = await Location.findById(id);
//       if (!location) {
//         return res.status(404).json({ message: 'Location not found' });
//       }
//       return res.json(location); // Trả về địa điểm cụ thể
//     } else {
//       // Nếu không có id, trả về tất cả địa điểm
//       const locations = await Location.find();
//       return res.json(locations); // Trả về danh sách địa điểm
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // Route để cập nhật thông tin địa điểm (PUT)
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const location = await Location.findById(req.params.id);

//     if (!location) {
//       return res.status(404).json({ message: 'Location not found' });
//     }

//     // Cập nhật thông tin địa điểm
//     location.name = req.body.name || location.name;
//     location.image = req.file ? req.file.filename : req.body.image || location.image;
//     location.description = req.body.description || location.description;

//     const updatedLocation = await location.save();
//     res.status(200).json(updatedLocation);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route để xóa địa điểm (DELETE)
// router.delete('/:id', async (req, res) => {
//   try {
//     const location = await Location.findById(req.params.id);

//     if (!location) {
//       return res.status(404).json({ message: 'Location not found' });
//     }

//     await Location.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const router = express.Router();
const Location = require('../models/Location');
const Blog = require('../models/Blog'); // Import model Blog nếu bạn cần xử lý blog

// Cấu hình Multer để lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/'); // Thư mục lưu trữ file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Tạo tên file duy nhất
  },
});

const upload = multer({ storage: storage });

// Route tạo địa điểm mới
router.post('/', upload.single('image'), async (req, res) => {
  const location = new Location({
    name: req.body.name,
    image: req.file ? req.file.filename : req.body.image, // Lưu tên file hình ảnh (hoặc URL nếu có)
    description: req.body.description,
    blogs: req.body.blogs ? req.body.blogs : [], // Khởi tạo mảng blogs nếu có
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Route để lấy tất cả địa điểm hoặc một địa điểm cụ thể (GET)
router.get('/:id?', async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params

    if (id) {
      // Nếu id có, tìm địa điểm theo id và populate blogs
      const location = await Location.findById(id).populate('blogs');
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      return res.json(location); // Trả về địa điểm cụ thể
    } else {
      // Nếu không có id, trả về tất cả địa điểm
      const locations = await Location.find().populate('blogs'); // Populate blogs để lấy thông tin blogs
      return res.json(locations); // Trả về danh sách địa điểm
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route để cập nhật thông tin địa điểm (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Cập nhật thông tin địa điểm
    location.name = req.body.name || location.name;
    location.image = req.file ? req.file.filename : req.body.image || location.image;
    location.description = req.body.description || location.description;
    
    // Cập nhật mảng blogs nếu có
    if (req.body.blogs) {
      location.blogs = req.body.blogs; // Cập nhật mảng blogs từ request
    }

    const updatedLocation = await location.save();
    res.status(200).json(updatedLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route để xóa địa điểm (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    await Location.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
