import React, { useState, useEffect } from 'react';
import { List, Divider, Drawer, Input } from 'antd';
import axios from 'axios';

import CharacterCard from '../components/CharacterCard.js';
import CharacterDetails from '../components/CharacterDetails.js';

const { Search } = Input;

function Results() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [character, setCharacter] = useState({});

  const showDetails = (character) => {
    setCharacter(character)
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onSearch = (value) => {
    setQuery(value);
    axios.get(`https://rickandmortyapi.com/api/character?name=${value}`)
      .then((result) => setResults(result.data.results));
  };

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((result) => setResults(result.data.results));
  }, []);

  return(
    <div>
      <Drawer
        width={500}
        placement="right"
        visible={drawerVisible}
        onClose={closeDrawer}
        title={character.name}
      >
        <CharacterDetails {...character}/>
      </Drawer>
      <Search
        allowClear
        enterButton
        onSearch={onSearch}
      />
     <Divider orientation="left">Search Results for {query}</Divider>
     <List
      grid={{ gutter: 16, column: 5 }}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={results}
      renderItem={ (item) => (
        <List.Item key={item.id}>
          <CharacterCard {...item} onClick={() => showDetails(item)}/>
        </List.Item>
      )}
      />
    </div>
  );
};

export default Results;
