import React, { PureComponent } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Toolbar } from '../components';
import data from '../data/data';

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }
  onListItemPressed = item => {
    this.setState({ selected: item.name });
  };
  onBackPressed = () => {
    this.setState({ selected: null });
  };

  render() {
    const { selected } = this.state;

    return (
      <View style={styles.container}>
        <Toolbar isDetail={!!selected} onBackPress={this.onBackPressed} />
        <FlatList
          data={data}
          dataExtra={selected}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={this.onListItemPressed}
              isHidden={selected && selected !== item.name}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default List;
