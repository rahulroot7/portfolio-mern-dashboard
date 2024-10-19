import React, {useEffect,useState} from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Create = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onFinish = (values) => {
    const formDataToSend = new FormData();
    formDataToSend.append('course', values.course);
    formDataToSend.append('description', values.description);
    formDataToSend.append('image', values.image); // Access file directly
    // formDataToSend.append('author', values.author);

    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/blogs/create', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      message.success('Course created successfully');
      navigate('/course/list');
    })
    .catch(error => {
      message.error('Error creating course post');
    });
  };

  useEffect(() =>{
    courseList();
  },[])

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

  // Handle file upload change
  const beforeUpload = (file) => {
    form.setFieldsValue({ image: file });
    return false;
  };
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Create Course</h2>
      <Form
        form={form}
        name="createCourse"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Slect Course"
          name="course"
          rules={[{ required: true, message: 'Please input the course!' }]}
        >
          <Select options={courseDropList} showSearch={true}/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          valuePropName="file" // Set this to handle file uploads
          getValueFromEvent={(e) => e.file} // Ensure file is passed to form
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload beforeUpload={beforeUpload} maxCount={1} showUploadList={false}>
            <Button>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: 'Please input the author name!' }]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;