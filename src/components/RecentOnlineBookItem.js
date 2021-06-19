import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';

const RecentOnlineBookItem = ({
  data,
  index,
  onPressItem,
  onLongPressItem,
}) => {
  return (
    <ListItem
      key={index}
      bottomDivider
      onPress={() => onPressItem(data.bookUrl)}
      onLongPress={() => onLongPressItem(data.bookUrl)}
    >
      <Avatar source={{ uri: data.imgUrl }} size="large" />
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>{data.bookName}</ListItem.Title>
        <ListItem.Subtitle>{data.bookAuthor}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default RecentOnlineBookItem;
