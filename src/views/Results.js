import React, { useState, useEffect } from 'react';
import { List, Divider, Drawer, Input } from 'antd';
import axios from 'axios';

import CharacterCard from '../components/CharacterCard.js';
import CharacterDetails from '../components/CharacterDetails.js';

const { Search } = Input;

const CHARACTER_API = 'https://rickandmortyapi.com/api/character'

function Results() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    // API returns alphabetical instead of ID order when ?name='' is provided
    axios.get(!!value ? `${CHARACTER_API}?name=${value}` : CHARACTER_API)
      .then((result) => setResults(result.data.results))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    axios.get(CHARACTER_API)
      .then((result) => setResults(result.data.results))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
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
      <Divider orientation="left">
        {
          query
            ? `Search Results for ${query}`
            : 'All Rick & Morty Characters'
        }
      </Divider>
      <List
        grid={{ gutter: 16, column: 5 }}
        loading={loading}
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
