import React, { useState, useEffect } from 'react';
import { List, Divider } from 'antd';
import axios from 'axios';

const query = 'aaa';

function Search() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((result) => {
        setResult(result.data.results);
      });
  }, []);

  return(
    <div>

     <Divider orientation="left">Search Results for {query}</Divider>
     <List
      bordered
      dataSource={result}
      renderItem={ (item) => (
        <List.Item>
          {item.name}
        </List.Item>
      )}
      />
    </div>
  );
};

export default Search;
