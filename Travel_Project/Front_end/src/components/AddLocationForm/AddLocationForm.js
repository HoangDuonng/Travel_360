import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddLocationForm.module.css';

const AddLocationForm = ({ onSubmit, locationToEdit, onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (locationToEdit) {
            console.log('Location to edit:', locationToEdit); // In ra để kiểm tra
            setName(locationToEdit.name);
            setDescription(locationToEdit.description || '');
            setImage(null); // Đặt lại hình ảnh vì hình ảnh cũ không nên được giữ
            setImagePreview(locationToEdit.image ? `http://localhost:5000/image/${locationToEdit.image}` : ''); // Hiển thị hình ảnh hiện tại
        } else {
            // Nếu không có locationToEdit, reset
            setName('');
            setDescription('');
            setImage(null);
            setImagePreview('');
        }
    }, [locationToEdit]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (locationToEdit) {
                await axios.put(`http://localhost:5000/api/locations/${locationToEdit._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onUpdate({ id: locationToEdit._id, name, description, image: image ? imagePreview : locationToEdit.image }); // Cập nhật thông tin địa điểm
            } else {
                const response = await axios.post('http://localhost:5000/api/locations', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onSubmit(response.data);
            }
            // Reset form
            setName('');
            setDescription('');
            setImage(null);
            setImagePreview('');
        } catch (error) {
            console.error('Error adding/updating location:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{locationToEdit ? 'Cập Nhật Địa Điểm' : 'Thêm Địa Điểm'}</h2>
            <div>
                <label htmlFor="name">Tên địa điểm:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
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
                <label htmlFor="image">Tải lên Hình ảnh:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {imagePreview && (
                <img src={imagePreview} alt="Preview" width={100} />
            )}
            <button type="submit">{locationToEdit ? 'Cập nhật địa điểm' : 'Lưu địa điểm'}</button>
        </form>
    );
};

export default AddLocationForm;
