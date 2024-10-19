import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Contact = () => {
  const [contactData, setContactData] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {  
    getContact();
  }, []);

  function getContact() {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/master/contact/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContactData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Handle deletion of a contact
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/master/contact/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Refresh the data after deletion
        getContact();
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  // Define columns for the contact data
  const columns = [
    {
      title: 'SN.',
      dataIndex: 'SN',
      key: 'SN',
      width: '50px',
    },
    {
      title: 'Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div>
          <button
            onClick={() => handleDelete(record._id)}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            <FaTrash size={20} color="red" />
          </button>
        </div>
      ),
    },
  ];

  // Filter the data based on the search input
  const filteredData = contactData?.filter(
    (item) =>
      item.firstname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.phone.toLowerCase().includes(filterText.toLowerCase())
  );

  // Map the filtered data for the table
  const dataSource = filteredData.map((item, idx) => ({
    SN: idx + 1,
    firstname: item.firstname,
    email: item.email,
    phone: item.phone,
    message: item.message,
    createdAt: item.createdAt,
    _id: item._id,
  }));

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Name, Email, or Phone"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      {/* Data table with filtered contact data */}
      <Table columns={columns} dataSource={dataSource} rowKey="_id" />
    </div>
  );
};

export default Contact;
