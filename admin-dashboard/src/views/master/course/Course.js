import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Drawer, Form, message } from 'antd';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch course data from API
  useEffect(() => {  
    getCourses();
  }, []);

  const getCourses = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/master/course', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Handle create course
  const handleCreateCourse = async (values) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/master/course/create', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Course created successfully!');
      form.resetFields();
      setOpen(false);
      getCourses(); // Refresh the course list
    } catch (error) {
      console.error('Error creating course:', error);
      message.error('Already exist this course.');
    }
  };

  // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.delete(`http://localhost:5000/api/master/course/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                if(result){
                    getCourses();
                    message.success(result.data.message);
                }                
            }catch(error) {
                console.log(error);
                message.error(error.message);
            };
        }
    };

  // Define columns for the table data
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
    }];

  // Filter the data based on the search input
  const filteredData = courses.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Map the filtered data for the table
  const dataSource = filteredData.map((item, idx) => ({
    SN: idx + 1,
    name: item.name,
    createdAt: item.createdAt,
    _id: item._id, // Use the actual ID for the rowKey
  }));

  return (
    <div>
      {/* Search input */}
      <Input
        placeholder="Search by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      {/* Add Course button */}
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: '10px' }}>
        Add Course
      </Button>

      {/* Data table with filtered course data */}
      <Table columns={columns} dataSource={dataSource} rowKey="_id" />

      {/* Drawer for adding a new course */}
      <Drawer
        title="Create Course"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Form form={form} onFinish={handleCreateCourse} layout="vertical">
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => setOpen(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Course;
