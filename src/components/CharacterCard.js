import React from 'react';
import { Card, Divider } from 'antd';
import { AimOutlined, DesktopOutlined } from '@ant-design/icons'

function CharacterCard(props) {
  const {name, image, episode, location} = props;

  return(
    <a href="/">
      <Card
      title={name}
      cover={
        <img src={image} alt={name}/>
      }>
        <Divider orientation="left" plain>
          <DesktopOutlined/> Episodes
        </Divider>
         {episode.length}
         <Divider orientation="left" plain>
           <AimOutlined/> Location
         </Divider>
        {location.name}
      </Card>
    </a>
  );
};

export default CharacterCard;
