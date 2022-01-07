import { Form, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SearchForm.css';

const SearchForm = () => {
  const [form] = Form.useForm();
  
  return (
    <Form layout="inline" form={form}>
      <Form.Item label="Title">
        <Input placeholder="" />
      </Form.Item>
      <Form.Item label="Year">
        <Input placeholder="" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" shape="circle" icon={<SearchOutlined />}/>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
