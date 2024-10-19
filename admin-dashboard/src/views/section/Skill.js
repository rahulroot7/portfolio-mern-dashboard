import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Space, List } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Skill = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([{ name: '', percentage: 0 }]);
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    // Fetch current skill data when component mounts
    const fetchSkill = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/master/skill`, { // Ensure you're fetching with the correct ID
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { title, description, skills } = response.data;
        setSkillData(response.data)
        form.setFieldsValue({ title, description }); 
        setSkills(skills);
      } catch (error) {
        message.error('Failed to fetch skill data');
      }
    };

    fetchSkill();
  }, [form]); // Dependency array includes id and form

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', percentage: 0 }]); // Add a new skill
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index); // Remove skill at index
    setSkills(newSkills);
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value; // Update the specific skill field
    setSkills(newSkills);
  };

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');
    const { title, description } = values;
    if (!skillData._id) {
      message.error('Skill ID is undefined');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/master/skill/update/${skillData._id}`,
        {
          title,
          description,
          skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate('/section/skill');
      message.success('Skill updated successfully!');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update skill');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
          <Input.TextArea />
        </Form.Item>

        <h3>Skills</h3>
        <List
          bordered
          dataSource={skills}
          renderItem={(item, index) => (
            <List.Item>
              <Space>
                <Form.Item
                  label="Skill Name"
                  required
                  rules={[{ required: true, message: 'Please enter the skill name!' }]}
                >
                  <Input
                    value={item.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Percentage"
                  required
                  rules={[{ required: true, message: 'Please enter the percentage!' }]}
                >
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={item.percentage}
                    onChange={(e) => handleSkillChange(index, 'percentage', Number(e.target.value))}
                  />
                </Form.Item>

                <Button type="link" danger onClick={() => handleRemoveSkill(index)}>Remove</Button>
              </Space>
            </List.Item>
          )}
        />

        <Button type="dashed" onClick={handleAddSkill} style={{ width: '100%', marginBottom: 16 }}>
          Add Skill
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Update Skill
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Skill;
