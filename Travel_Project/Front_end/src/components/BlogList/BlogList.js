import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import styles from './BlogList.module.css';

const BlogList = ({ onEdit }) => {
    const [blogs, setBlogs] = useState([]); // State để lưu danh sách blog
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []); // Chỉ gọi một lần khi component mount

    const handleDelete = async (blog) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa blog "${blog.title}"?`)) {
            try {
                // Gọi API xóa blog
                await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`);
                
                // Cập nhật state blogs sau khi xóa
                setBlogs(blogs.filter(b => b._id !== blog._id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Hiển thị loading khi đang lấy dữ liệu
    }

    if (error) {
        return <p>Error: {error}</p>; // Hiển thị thông báo lỗi nếu có
    }

    return (
        <div className={styles.container}>
            <h3>Danh Sách Blog</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tiêu Đề</th>
                        <th>Hình Ảnh</th>
                        <th>Nội Dung</th>
                        <th>Địa Điểm</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000/image/${blog.image}`}
                                    alt={blog.title}
                                    width={100}
                                    style={{ borderRadius: '4px' }} // Bo góc cho hình ảnh
                                />
                            </td>
                            <td>{blog.description}</td>
                            <td>{blog.locationId}</td>
                            <td>
                                <button onClick={() => onEdit(blog)}>Sửa</button>
                                <button onClick={() => handleDelete(blog)}>Xóa</button> {/* Gọi hàm handleDelete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogList;
