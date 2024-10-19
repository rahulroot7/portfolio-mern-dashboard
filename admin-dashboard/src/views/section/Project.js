import React, { useEffect, useState } from 'react';
import { Form, Input, Button, List, Upload, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectId, setProjectId] = useState(null); // To store the dynamic project ID

    // Fetch current project data on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/master/project', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const { _id, title, description, projects } = response.data;
                form.setFieldsValue({ title, description });
                setProjects(projects);
                setProjectId(_id); // Store the dynamic project ID
                setLoading(false);
            })
            .catch((error) => {
                message.error('Failed to load project data');
                setLoading(false);
            });
    }, [form]);

    // Handle project input change
    const handleProjectChange = (index, key, value) => {
        const newProjects = [...projects];
        newProjects[index][key] = value;
        setProjects(newProjects);
    };

    // Handle image upload for a specific project
    const handleImageUpload = (index, file) => {
        const newProjects = [...projects];
        newProjects[index].image = file;
        // setProjects(newProjects);
        return false; // Prevent auto upload
    };

    // Add a new project
    const handleAddProject = () => {
        setProjects([...projects, { title: '', description: '', image: null }]);
    };

    // Remove a project
    const handleRemoveProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    // Handle form submission
    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);

        // Append each project's data
        projects.forEach((project, index) => {
            formData.append(`projects[${index}][title]`, project.title);
            formData.append(`projects[${index}][description]`, project.description);
            formData.append(`projects[${index}][image]`, project.image);
        });

        try {
            await axios.put(`http://localhost:5000/api/master/project/update/${projectId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success('Project updated successfully');
            window.location.reload();
        } catch (error) {
            message.error('Failed to update project');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
                    <Input.TextArea />
                </Form.Item>

                <h3>Projects</h3>
                <List
                    bordered
                    dataSource={projects}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Form.Item
                                    label="Project Title"
                                    rules={[{ required: true, message: 'Please enter the project title!' }]}
                                >
                                    <Input
                                        value={item.title}
                                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Project Description"
                                    rules={[{ required: true, message: 'Please enter the project description!' }]}
                                >
                                    <Input
                                        value={item.description}
                                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Project Image"
                                    rules={[{ required: true, message: 'Please upload the project image!' }]}
                                >
                                    <Upload
                                        multiple
                                        showUploadList={false}
                                        beforeUpload={(file) => handleImageUpload(index, file)}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Project Images</Button>
                                    </Upload>
                                    {item.image && (
                                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={`http://localhost:5000/${item.image}`}
                                                alt="Current Project"
                                                style={{ width: '100px', marginRight: '10px' }}
                                            />
                                            <span>{item.image.name}</span>
                                        </div>
                                    )}
                                </Form.Item>

                                <Button type="link" danger onClick={() => handleRemoveProject(index)}>Remove</Button>
                            </Space>
                        </List.Item>
                    )}
                />

                <Button type="dashed" onClick={handleAddProject} style={{ width: '100%', marginBottom: 16 }}>
                    Add Project
                </Button>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Update Project
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProjectForm;
