import React, { useState, useEffect } from 'react';
import { Divider, Image, Button, List } from 'antd';
import API from '../api';


function CharacterDetails(props) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode
  } = props;

  useEffect(() => {
    setLoading(true);

    Promise.all(episode.map((url) => API.get(url)))
      .then((responses) => {
        setResults(responses.map((response) => ({...response.data})));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [episode]);

  const handleClick = (name) => {
    alert(`Ayo! Buy merchandise from ${name}!`);
  };

  return(
    <div>
      <Image src={image} width={450}/>
      <Divider/>
      <b>Status:</b> {status} <br/>
      <b>Species:</b> {species} <br/>
      <b>Type:</b> {type || "Unknown"} <br/>
      <b>Gender:</b> {gender} <br/>
      <b>Origin:</b> {origin.name} <br/>
      <b>Location:</b> {location.name} <br/>
      <Divider/>
      <Button type="primary" block onClick={() => handleClick(name)}>
        Buy Merchandise!
      </Button>
      <Divider orientation="left">
        List of Episodes ({episode.length})
      </Divider>
      <List
        loading={loading}
        dataSource={results}
        renderItem={ (item) => (
          <List.Item key={item.id}>
            {item.episode} - {item.name} ({item.air_date})
          </List.Item>
        )}
      />
    </div>
  );
};

export default CharacterDetails;
