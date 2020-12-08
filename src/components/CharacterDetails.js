import React from 'react';
import { Divider, Image, Button } from 'antd';

function CharacterDetails(props) {
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
      <b>Episode:</b> {episode.length} <br/>
      <Divider/>
      <Button type="primary" onClick={() => handleClick(name)}>
        Buy Merchandise!
      </Button>
    </div>
  );
};

export default CharacterDetails;
