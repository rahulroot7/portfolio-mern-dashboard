import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    // Fetch header data on component mount
    useEffect(() => {
        const fetchHeader = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/master/header', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.logo) {
                    setExistingImage(response.data.logo);
                }
                setInitialData(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Error fetching header data');
            }
        };
        fetchHeader();
    }, [form]);

    // Handle form submission
    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        // Only append new logo if uploaded
        if (newImage) {
            formData.append('logo', newImage); // Upload new logo if selected
        } else if (existingImage) {
            formData.append('logo', existingImage); // Use existing logo
        }

        try {
            if (initialData) {
                // Update existing header
                await axios.put(`http://localhost:5000/api/master/header/update/${initialData._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                message.success('Header updated successfully');
            } else {
                // Create new header
                await axios.post('http://localhost:5000/api/master/header', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                message.success('Header created successfully');
            }
           window.location.reload();
        } catch (error) {
            message.error('Error submitting header data');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Header Setting</h2>
            <Form
                form={form}
                name="headerForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Menu"
                    name="menu"
                    rules={[{ required: true, message: 'Please input the menu!' }]}
                >
                    <Input placeholder='Home,Skills,Projects' />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="file" // Set this to handle file uploads
                    getValueFromEvent={(e) => e.fileList} // Ensure file is passed to form
                >
                    <Upload maxCount={1} showUploadList={false} onChange={({ file }) => setNewImage(file.originFileObj)}>
                        <Button>Upload Logo</Button>
                    </Upload>
                </Form.Item>

                {/* Show existing image if available */}
                {existingImage && (
                    <Form.Item label="Current Logo">
                        <img
                            src={`http://localhost:5000/${existingImage}`} // URL of the existing logo
                            alt="Current Logo"
                            style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label="LinkedIn"
                    name="linkedin"
                    rules={[{ required: true, message: 'Please input your LinkedIn URL!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="GitHub"
                    name="github"
                    rules={[{ required: true, message: 'Please input your GitHub URL!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Facebook"
                    name="facebook"
                    rules={[{ required: true, message: 'Please input your Facebook URL!' }]
                }>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Instagram"
                    name="instagram"
                    rules={[{ required: true, message: 'Please input your Instagram URL!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contact"
                    name="contact"
                    rules={[{ required: true, message: 'Please input your contact!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Header;
