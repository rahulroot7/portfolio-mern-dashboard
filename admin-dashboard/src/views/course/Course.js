import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Input, Form, Space, Upload, message, Select } from 'antd';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Course = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null); // To store the selected image file

  // Fetch blog data from API
  useEffect(() => {  
    getCourse();
    courseList();
  }, []);
  function getCourse(){
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/api/blogs/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          getCourse();
          message.success('Blog deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
          message.error('Error deleting blog');
        });
    }
  };

  // Handle edit action
  const handleEdit = (record) => {
    console.log(record);
    setCurrentBlog(record);
    form.setFieldsValue({
      course: record.course?.oid,
      description: record.description,
      author: record.author,
    });
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setCurrentBlog(null);
    setImageFile(null); // Clear the selected image file on close
  };

  const beforeUpload = (file) => {
    setImageFile(file); // Store the selected image file
    return false; // Prevent automatic upload
  };

  const onFinish = (values) => {
    const token = localStorage.getItem('token');

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append('course', values.course);
    formData.append('description', values.description);
    formData.append('author', values.author);
    if (imageFile) {
      formData.append('image', imageFile); // Append the selected image file if any
    }
    axios
      .put(`http://localhost:5000/api/blogs/update/${currentBlog._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        getCourse();
        message.success('Blog updated successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Error updating blog');
      });
  };

  // Define columns for the blog data
  const columns = [
    {
      course: 'SN.',
      dataIndex: 'SN',
      key: 'SN',
      width: '50px',
    },
    {
      course: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      course: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      course: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      course: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
      key: 'createdAt',
    },
    {
      course: 'Image',
      render: (_, record) => (
        <img
          src={`http://localhost:5000/${record.image}`}
          alt={record.course}
          width="50"
        />
      ),
      key: 'image',
    },
    {
      course: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div>
          <button
            onClick={() => handleEdit(record)}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <FaEdit size={20} color="blue" />
          </button>
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
  const filteredData = blogs.filter(
    (item) =>
      item.course.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.description.toLowerCase().includes(filterText.toLowerCase()) ||
      item.author.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Map the filtered data for the table
  const dataSource = filteredData.map((item, idx) => ({
    SN: idx + 1,
    course: item.course.name,
    description: item.description,
    image: item.image,
    author: item?.author?.name,
    createdAt: item.createdAt,
    _id: item._id,
  }));

  // get course list
  const courseDropdown = [];
  const [courseDropList,setDropdown]= useState([]);
  const courseList = async () => {
    const token = localStorage.getItem('token');
    try {
        const result = await axios.get(`http://localhost:5000/api/master/course`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        if(result){

            result?.data?.forEach((item)=>{
              courseDropdown.push({value:item._id,label:item.name})
            })
            setDropdown(courseDropdown);
        }                
    }catch(error) {
        message.error(error.message);
    };
  };
  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by course, description, or author"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      {/* Data table with filtered blog data */}
      <Table columns={columns} dataSource={dataSource} rowKey="_id" />

      {/* Drawer for edit form */}
      <Drawer
        course="Edit Blog"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          id="editForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={currentBlog}
        >
          <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: 'Please enter the course' }]}
          >
            <Select options={courseDropList} showSearch={true}/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          {/* Image upload field */}
          <Form.Item
            label="Image"
            name="image"
            valuePropName="file"
          >
            <Upload
              beforeUpload={beforeUpload}
              maxCount={1}
              showUploadList={false}
            >
              <Button>Upload Image</Button>
            </Upload>
            {currentBlog?.image && (
              <img
                src={`http://localhost:5000/${currentBlog.image}`}
                alt="Current"
                style={{ width: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>

          {/* <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please enter the author name' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Course;
