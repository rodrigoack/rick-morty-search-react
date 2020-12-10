import React, { useState, useEffect } from 'react';
import { List, Divider, Drawer, Input } from 'antd';

import API from '../api';

import CharacterCard from '../components/CharacterCard';
import CharacterDetails from '../components/CharacterDetails';

const { Search } = Input;

const PAGE_SIZE = 5;

function Results(props) {
  const { query, handleSearch } = props;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [character, setCharacter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const showDetails = (character) => {
    setCharacter(character)
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onSearch = (value) => {
    handleSearch(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getResults = async (url, query) => {
      const response = await API.get(url, {
        params: {
          name: query
        }
      });

      const data = response.data;

      if (data.info.next) {
        return data.results.concat(await getResults(data.info.next));
      }

      return data.results;
    }

    (async () => {
      setLoading(true);
      try {
        setResults(await getResults('character', query));
      } catch (e) {
        setResults([]);
      }
      setLoading(false);
    })();
  }, [query]);

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
        defaultValue={query}
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
          onChange: (page) => setCurrentPage(page),
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
