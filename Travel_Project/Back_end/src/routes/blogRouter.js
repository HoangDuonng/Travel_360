const express = require('express');
const multer = require('multer');
const router = express.Router();
const Blog = require('../models/Blog');
const Location = require('../models/Location');

// Cấu hình Multer để lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/'); // Thư mục lưu trữ file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file duy nhất
    },
});

const upload = multer({ storage: storage });

// Route tạo blog mới
// router.post('/', upload.single('image'), async (req, res) => {
//     const { title, description, locationId } = req.body; // Nhận các giá trị từ body
//     const image = req.file ? req.file.filename : req.body.image; // Lấy tên file từ req.file nếu có, nếu không thì từ req.body

//     const newBlog = new Blog({
//         title,
//         description,
//         image, // Lưu tên file ảnh
//         locationId // Lưu ID của location vào blog
//     });
    
//     try {
//         const savedBlog = await newBlog.save();

//         // Cập nhật location để thêm ID của blog vào danh sách blogs
//         await Location.findByIdAndUpdate(locationId, {
//             $push: { blogs: savedBlog._id } // Thêm ID của blog vào trường blogs của location
//         });

//         res.status(201).json(savedBlog);
//     } catch (error) {
//         console.error("Lỗi khi thêm blog:", error);
//         res.status(500).json({ message: 'Lỗi khi thêm blog' });
//     }
// });
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description, locationId } = req.body; // Nhận các giá trị từ body
    const image = req.file ? req.file.filename : req.body.image; // Lấy tên file từ req.file nếu có, nếu không thì từ req.body

    const newBlog = new Blog({
        title,
        description,
        image, // Lưu tên file ảnh
        locationId // Lưu ID của location vào blog
    });

    try {
        const savedBlog = await newBlog.save(); // Lưu blog vào database

        // Cập nhật location để thêm ID của blog vào danh sách blogs
        await Location.findByIdAndUpdate(locationId, {
            $push: { blogs: savedBlog._id } // Thêm ID của blog vào trường blogs của location
        });

        res.status(201).json(savedBlog); // Trả về blog đã được lưu
    } catch (error) {
        console.error("Lỗi khi thêm blog:", error);
        res.status(500).json({ message: 'Lỗi khi thêm blog' }); // Trả về lỗi nếu có
    }
});


// Route để lấy tất cả blog (GET)
router.get('/:id?', async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
        return res.json(blog);
      } else {
        const blogs = await Blog.find();
        return res.json(blogs);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });


// Route để cập nhật thông tin blog (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Cập nhật thông tin blog
        blog.title = req.body.title || blog.title;
        blog.image = req.file ? req.file.filename : req.body.image || blog.image;
        blog.description = req.body.description || blog.description;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route để xóa blog (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
