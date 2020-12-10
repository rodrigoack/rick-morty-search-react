import React from 'react'
import { Row, Col, Input } from 'antd';

const { Search } = Input;

const logoStyle = {
  textAlign: 'center',
  fontSize: 64,
  margin: 100
};

function Home(props) {
  const { handleSearch } = props;

  return (
    <div>
      <Row justify="center">
        <Col>
          <h1 style={logoStyle}> RICK AND MORTY SEARCH BABY OH YEA </h1>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <Search
            allowClear
            enterButton
            size="large"
            onSearch={handleSearch}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
