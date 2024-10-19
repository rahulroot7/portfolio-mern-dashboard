import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    // Fetch footer data on component mount
    useEffect(() => {
        const fetchFooter = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/master/footer', {
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
                message.error('Error fetching footer data');
            }
        };
        fetchFooter();
    }, [form]);

    // Handle form submission
    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        // Append form values to FormData object
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        // Only append new logo if uploaded
        if (newImage) {
            formData.append('logo', newImage);
        } else if (existingImage) {
            formData.append('logo', existingImage);
        }

        try {
            if (initialData) {
                // Update existing footer data
                await axios.put(`http://localhost:5000/api/master/footer/update/${initialData._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                message.success('Footer updated successfully');
            } else {
                // Create new footer data
                await axios.post('http://localhost:5000/api/master/footer', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                message.success('Footer created successfully');
            }
            window.location.reload();
        } catch (error) {
            message.error('Error submitting footer data');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Footer Setting</h2>
            <Form
                form={form}
                name="footerForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item label="Logo" name="logo" valuePropName="file">
                    <Upload maxCount={1} showUploadList={false} onChange={({ file }) => setNewImage(file.originFileObj)}>
                        <Button>Upload Logo</Button>
                    </Upload>
                </Form.Item>

                {existingImage && (
                    <Form.Item label="Current Logo">
                        <img src={`http://localhost:5000/${existingImage}`} alt="Current Logo" style={{ width: '100px' }} />
                    </Form.Item>
                )}

                <Form.Item label="LinkedIn" name="linkedin" rules={[{ required: true, message: 'Please input your LinkedIn URL!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="GitHub" name="github" rules={[{ required: true, message: 'Please input your GitHub URL!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Facebook" name="facebook" rules={[{ required: true, message: 'Please input your Facebook URL!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Instagram" name="instagram" rules={[{ required: true, message: 'Please input your Instagram URL!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Copyright" name="copyright" rules={[{ required: true, message: 'Please input your copyright information!' }]}>
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

export default Footer;
