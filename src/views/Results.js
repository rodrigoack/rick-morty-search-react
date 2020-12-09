import React, { useState, useEffect } from 'react';
import { List, Divider, Drawer, Input } from 'antd';
import axios from 'axios';

import CharacterCard from '../components/CharacterCard.js';
import CharacterDetails from '../components/CharacterDetails.js';

const { Search } = Input;

const CHARACTER_API = 'https://rickandmortyapi.com/api/character'
const PAGE_SIZE = 5;

function Results() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);
  const [character, setCharacter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);


  const showDetails = (character) => {
    setCharacter(character)
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onSearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
    setApiPage(1);
    setResults([]);
  };

  const handlePagination = (page) => {
    if (page > currentPage) {
      setApiPage(Math.ceil(page/4));
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    axios.get(CHARACTER_API, {
      params: {
        name: query,
        page: apiPage
      }})
      .then((response) => {
        setResults((results) => [...results, ...response.data.results]);
        setInfo(response.data.info);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [query, apiPage]);

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
        placeholder="Search by character name..."
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
          onChange: (page) => handlePagination(page),
          total: info.count,
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          current: currentPage
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
