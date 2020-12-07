import React from 'react';
import { Layout, Col } from 'antd';
import Home from './views/Home.js';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <Col span={24}>
          <div className="site-layout-content">
            <Home/>
          </div>
        </Col>
      </Content>
    </Layout>
  );
}

export default App;
