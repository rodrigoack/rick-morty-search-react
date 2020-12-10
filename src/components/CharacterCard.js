import React from 'react';
import { Card, Divider } from 'antd';
import { AimOutlined, DesktopOutlined } from '@ant-design/icons'

const style = {
  cursor: 'pointer'
};

function CharacterCard(props) {
  const {name, image, episode, location} = props;
  const handleClick = props.onClick;

  return(
    <Card
      hoverable
      style={style}
      title={name}
      cover={<img src={image} alt={name}/>}
      onClick={handleClick}
    >
      <Divider orientation="left" plain>
        <DesktopOutlined/> Episodes
      </Divider>
       {episode.length}
       <Divider orientation="left" plain>
         <AimOutlined/> Location
       </Divider>
      {location.name}
    </Card>
  );
};

export default CharacterCard;
