import { Layout, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import SearchForm from './components/SearchForm';

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout style={{minHeight:"100vh"}}>
        <Content>
          <Card title="Find Movie">
            <Row justify="center">
              <Col span={12}>
                <SearchForm/>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </>
  );
}

export default App;
