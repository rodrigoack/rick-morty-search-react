import React from 'react';
import { List, Divider } from 'antd';

const data = ['a', 'b', 'c', 'd', 'e'];

const query = 'aaa';

function Search() {
  return(
    <div>
     <Divider orientation="left">Search Results for {query}</Divider>
     <List
      bordered
      dataSource={data}
      renderItem={ (item) => (
        <List.Item>
          {item}
        </List.Item>
      )}
      />
    </div>
  );
};

export default Search;
