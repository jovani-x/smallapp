import { Form, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SearchForm.css';

const SearchForm = (props) => {
  const [form] = Form.useForm();
  
  return (
    <>
      <Form.Provider onFormFinish={props.onValuesChanged} >
        <Form layout="inline" form={form}>
          <Form.Item label="Title" name="title">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Year" name="year">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" shape="circle" icon={<SearchOutlined />}/>
          </Form.Item>
        </Form>
      </Form.Provider>
    </>
  );
}

export default SearchForm;
