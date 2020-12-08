import React from 'react';

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

  return(
    <div>
      name: {name} <br/>
      status: {status}
      species: {species} <br/>
      type: {type} <br/>
      gender: {gender} <br/>
      origin: {origin.name} <br/>
      location: {location.name} <br/>
      image: {image} <br/>
      episode: {episode.length} <br/>
    </div>
  );
};

export default CharacterDetails;
