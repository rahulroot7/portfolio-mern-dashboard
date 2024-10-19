import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your backend API
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) 
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: 'SN.',
      dataIndex: 'SN',
      key: 'SN',
      width: '50px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = '';
        switch (role) {
          case 'admin':
            color = 'red';
            break;
          case 'moderator':
            color = 'blue';
            break;
          default:
            color = 'green'; // Default color for 'user'
            break;
        }
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
      key: 'createdAt',
    },
  ];

  // Map the filtered data for the table
  const dataSource = users.map((item, idx) => ({
    SN: idx + 1,
    name: item.name,
    email: item.email,
    role: item.role,
    createdAt: item.createdAt,
  }));

  return (
    <div>
      <h1>User List</h1>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        rowKey="_id" 
        loading={loading} 
        pagination={{ pageSize: 5 }} // Adjust pagination as needed
      />
    </div>
  );
}

export default User;
