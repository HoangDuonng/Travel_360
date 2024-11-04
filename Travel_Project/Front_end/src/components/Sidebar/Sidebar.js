import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ onFormSwitch }) => {
    return (
        <div className={styles.sidebar}>
            <h2>Admin Menu</h2>
            <ul>
                <li onClick={() => onFormSwitch('location')}>Thêm Địa Điểm</li>
                <li onClick={() => onFormSwitch('blog')}>Thêm mô tả chi tiết địa điểm</li>
            </ul>
        </div>
    );
};

export default Sidebar;
