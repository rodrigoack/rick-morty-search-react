import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, Col } from 'antd';

import Home from './views/Home';
import Results from './views/Results';

import './App.css';

const { Content } = Layout;

function App() {
  const [query, setQuery] = useState('');

  return (
    <Router>
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Col span={24}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/search">
                  <Results handleSearch={setQuery} query={query}/>
                </Route>
                <Route path="/">
                  {
                    query
                      ? <Redirect to="/search" />
                      : <Home handleSearch={setQuery}/>
                  }
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
