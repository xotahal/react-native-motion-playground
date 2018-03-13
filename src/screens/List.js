import React, { PureComponent } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Toolbar, BottomBar } from '../components';
import data from '../data/data';

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.itemRefs = {};
  }
  onListItemPressed = (item, nativeEvent) => {
    const { onShowDetailRequest } = this.props;

    this.itemRefs[item.name].measure((x, y, width, height, pageX, pageY) => {
      console.log(x, y, width, height, pageX, pageY);
      onShowDetailRequest(item, { width, pageX, pageY });
    });
  };
  render() {
    const { selected } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          dataExtra={selected}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View
              style={{ backgroundColor: 'transparent' }}
              ref={c => (this.itemRefs[item.name] = c)}
            >
              <ListItem
                item={item}
                onPress={this.onListItemPressed}
                isHidden={selected && selected !== item.name}
                isSelected={selected === item.name}
              />
            </View>
          )}
        />
        <BottomBar isHidden={!!selected} />
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
