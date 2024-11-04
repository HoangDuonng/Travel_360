import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddBlogForm.module.css';

const AddBlogForm = ({ onSubmit, blogToEdit, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]); // State để lưu danh sách địa điểm
    const [imagePreview, setImagePreview] = useState(''); // State để lưu hình ảnh preview

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/locations'); // Lấy danh sách địa điểm
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();

        // Nếu đang chỉnh sửa blog, thiết lập giá trị cho form
        if (blogToEdit) {
            setTitle(blogToEdit.title);
            setDescription(blogToEdit.description);
            setSelectedLocation(blogToEdit.locationId);
            setImage(null); // Đặt lại hình ảnh vì hình ảnh cũ không nên được giữ
            setImagePreview(blogToEdit.image ? `http://localhost:5000/image/${blogToEdit.image}` : ''); // Hiển thị hình ảnh hiện tại
        } else {
            setTitle('');
            setDescription('');
            setSelectedLocation('');
            setImage(null);
            setImagePreview('');
        }
    }, [blogToEdit]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBlog = { title, image, description, locationId: selectedLocation }; // Đảm bảo locationId được sử dụng

        const formData = new FormData();
        formData.append('title', newBlog.title);
        formData.append('image', newBlog.image); // Đây sẽ là file hình ảnh
        formData.append('description', newBlog.description);
        formData.append('locationId', newBlog.locationId); // Gửi locationId

        try {
            if (blogToEdit) {
                // Cập nhật blog nếu đang chỉnh sửa
                await axios.put(`http://localhost:5000/api/blogs/${blogToEdit._id}`, formData);
                onUpdate(newBlog);
            } else {
                // Thêm blog mới
                await axios.post('http://localhost:5000/api/blogs', formData);
                onSubmit(newBlog);
            }

            // Reset form
            setTitle('');
            setImage(null);
            setDescription('');
            setSelectedLocation('');
            setImagePreview('');
        } catch (error) {
            console.error('Error adding/updating blog:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{blogToEdit ? 'Chỉnh sửa Blog' : 'Thêm Blog'}</h2>
            <div>
                <label htmlFor="title">Tiêu đề Blog:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="image">Tải lên Hình ảnh:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </div>
            {imagePreview && (
                <img src={imagePreview} alt="Preview" width={100} />
            )}
            <div>
                <label htmlFor="description">Mô tả:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="location">Chọn Địa điểm:</label>
                <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    required
                >
                    <option value="">Chọn địa điểm</option>
                    {locations && locations.length > 0 ? (
                        locations.map((location) => (
                            <option key={location._id} value={location._id}>
                                {location.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có địa điểm nào</option>
                    )}
                </select>
            </div>
            <button type="submit">{blogToEdit ? 'Cập nhật' : 'Lưu'}</button>
        </form>
    );
};

export default AddBlogForm;
