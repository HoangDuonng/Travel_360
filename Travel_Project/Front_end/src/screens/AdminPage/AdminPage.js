import React, { useState } from 'react';
import AddLocationForm from '../../components/AddLocationForm/AddLocationForm';
import AddBlogForm from '../../components/AddBlogForm/AddBlogForm';
import LocationList from '../../components/LocationList/LocationList';
import BlogList from '../../components/BlogList/BlogList'; // Import BlogList
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AdminPage.module.css';

const AdminPage = () => {
    // const [locations, setLocations] = useState([]);
    // const [blogs, setBlogs] = useState([]); // Thêm state cho danh sách blog
    const [locations, setLocations] = useState([]); // Sử dụng dữ liệu tĩnh
    const [blogs, setBlogs] = useState(staticBlogs); // Sử dụng dữ liệu tĩnh
    const [locationToEdit, setLocationToEdit] = useState(null);
    const [blogToEdit, setBlogToEdit] = useState(null);
    const [currentForm, setCurrentForm] = useState('location'); // Trạng thái cho form hiện tại
    
    const handleAddLocation = (newLocation) => {
        setLocations([...locations, { ...newLocation, image: URL.createObjectURL(newLocation.image) }]);
    };

    const handleUpdateLocation = (updatedLocation) => {
        setLocations(
            locations.map((loc) =>
                loc.name === locationToEdit.name ? updatedLocation : loc
            )
        );
        setLocationToEdit(null);
    };

    const handleEditLocation = (location) => {
        setLocationToEdit(location);
    };

    const handleDeleteLocation = (location) => {
        setLocations(locations.filter((loc) => loc !== location));
    };

    const handleAddBlog = (newBlog) => {
        setBlogs([...blogs, newBlog]); // Logic to add a new blog
    };

    const handleUpdateBlog = (updatedBlog) => {
        setBlogs(
            blogs.map((b) =>
                b.id === blogToEdit.id ? updatedBlog : b
            )
        );
        setBlogToEdit(null);
    };

    const handleEditBlog = (blog) => {
        setBlogToEdit(blog);
    };

    const handleDeleteBlog = (blog) => {
        setBlogs(blogs.filter((b) => b.id !== blog.id)); // Logic to delete a blog
    };

    const handleFormSwitch = (formType) => {
        setCurrentForm(formType); // Cập nhật trạng thái form hiện tại
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.adminSidebar}>
                <Sidebar onFormSwitch={handleFormSwitch} /> {/* Truyền hàm cho Sidebar */}
            </div>
            <div className={styles.adminContent}>
                <div className={styles.formContainer}>
                    {currentForm === 'location' && (
                        <>
                            <AddLocationForm
                                onSubmit={handleAddLocation}
                                locationToEdit={locationToEdit}
                                onUpdate={handleUpdateLocation}
                            />
                            <LocationList
                                locations={locations}
                                onEdit={handleEditLocation}
                                onDelete={handleDeleteLocation}
                            />
                        </>
                    )}
                    {currentForm === 'blog' && (
                        <>
                            <AddBlogForm
                                onSubmit={handleAddBlog}
                                blogToEdit={blogToEdit}
                                onUpdate={handleUpdateBlog}
                                locations={locations} // Pass locations for blog form
                            />
                            <BlogList
                                blogs={blogs}
                                onEdit={handleEditBlog}
                                onDelete={handleDeleteBlog}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


const staticBlogs = [
    {
        id: 1,
        title: 'Blog 1',
        content: 'Nội dung blog 1',
        locationId: 1,
        image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thực
    },
    {
        id: 2,
        title: 'Blog 2',
        content: 'Nội dung blog 2',
        locationId: 2,
        image: 'https://via.placeholder.com/100',
    },
];


export default AdminPage;


