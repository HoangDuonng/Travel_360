import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LocationList.module.css';

const LocationList = ({ onEdit, onDelete }) => {
    const [locations, setLocations] = useState([]);

    // Hàm lấy danh sách địa điểm
    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/locations");
            setLocations(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách địa điểm:", error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    // Hàm xử lý xóa địa điểm
    const handleDelete = async (location) => {
        const confirmDelete = window.confirm(`Bạn có chắc muốn xóa địa điểm ${location.name}?`);
        if (confirmDelete) {
            try {
                // Gọi API xóa địa điểm
                await axios.delete(`http://localhost:5000/api/locations/${location._id}`);
                // Sau khi xóa thành công, cập nhật lại danh sách địa điểm
                setLocations(locations.filter((loc) => loc._id !== location._id));
            } catch (error) {
                console.error("Lỗi khi xóa địa điểm:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h3>Danh Sách Địa Điểm</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Mô Tả</th>
                        <th>Hình Ảnh</th>
                        <th>Số Lượng Blog</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location.name}</td>
                            <td>{location.description}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000/image/${location.image}`}
                                    alt={location.name}
                                    width={100}
                                    style={{ borderRadius: '4px' }} // Bo góc cho hình ảnh
                                />
                            </td>
                            <td>{location.blogs ? location.blogs.length : 0}</td>
                            <td>
                                <button onClick={() => onEdit(location)}>Sửa</button> {/* Truyền location vào onEdit */}
                                <button onClick={() => handleDelete(location)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationList;
