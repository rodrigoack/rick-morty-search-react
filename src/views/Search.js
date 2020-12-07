import React, { useState, useEffect } from 'react';
import { List, Divider } from 'antd';
import axios from 'axios';

import CharacterCard from '../components/CharacterCard.js';

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
      grid={{ gutter: 16, column: 5 }}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={result}
      renderItem={ (item) => (
        <List.Item key={item.id}>
          <CharacterCard {...item}/>
        </List.Item>
      )}
      />
    </div>
  );
};

export default Search;
