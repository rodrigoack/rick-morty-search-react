import React, { useState, useEffect } from 'react';
import { List, Divider, Drawer, Button } from 'antd';
import axios from 'axios';

import CharacterCard from '../components/CharacterCard.js';
import CharacterDetails from '../components/CharacterDetails.js';

const query = 'aaa';

function Search() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [character, setCharacter] = useState({});

  const showDetails = (character) => {
    setCharacter(character)
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((result) => {
        setResults(result.data.results);
      });
  }, []);

  return(
    <div>
      <Drawer
        width={500}
        placement="right"
        visible={drawerVisible}
        onClose={closeDrawer}
      >
        <CharacterDetails {...character}/>
      </Drawer>
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

export default Search;
