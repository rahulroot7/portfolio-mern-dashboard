import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    // Fetch banner data on component mount
    useEffect(() => {
        const fetchBanner = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/master/banner', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.image) {
                    setExistingImage(response.data.image);
                }
                setInitialData(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Error fetching banner data');
            }
        };
        fetchBanner();
    }, [form]);

    // Handle form submission
    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        // Append form values to FormData object
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        // Only append new image if uploaded
        if (newImage) {
            formData.append('image', newImage);
        } else if (existingImage) {
            formData.append('image', existingImage);
        }

        try {
            if (initialData) {
                // Update existing banner data
                await axios.put(`http://localhost:5000/api/master/banner/update/${initialData._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                message.success('Banner updated successfully');
            } else {
                message.error('Banner data not found.');
            }
            window.location.reload();
        } catch (error) {
            message.error('Error submitting banner data');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 class="banner-text">Banner Setting</h2>
            <Form
                form={form}
                name="bannerForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the banner title!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Heading" name="heading" rules={[{ required: true, message: 'Please input the banner heading!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item label="URL" name="url" rules={[{ required: true, message: 'Please input the URL!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Logo" name="logo" valuePropName="file">
                    <Upload maxCount={1} showUploadList={false} onChange={({ file }) => setNewImage(file.originFileObj)}>
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                    </Upload>
                </Form.Item>

                {existingImage && (
                    <Form.Item label="Current Logo">
                        <img src={`http://localhost:5000/${existingImage}`} alt="Current Logo" style={{ width: '100px' }} />
                    </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Banner
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Banner;