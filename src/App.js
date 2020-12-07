import React from 'react';
import { Layout } from 'antd';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"> Content </div>
      </Content>
    </Layout>
  );
}

export default App;
