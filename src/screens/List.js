import React, { PureComponent } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from '../components';
import data from '../data/data';

class List extends PureComponent {
  render() {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default List;
