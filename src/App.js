import React from 'react';

// Libs
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Layout, Col } from 'antd';

// Views
import Home from './views/Home.js';
import Results from './views/Results.js';

// Style
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Col span={24}>
            <div className="site-layout-content">
            <Switch>
              <Route path="/search">
                <Results/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
            </div>
          </Col>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
