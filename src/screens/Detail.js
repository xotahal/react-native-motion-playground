import React, { PureComponent } from 'react';
import {
  InteractionManager,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  ListItem,
  Toolbar,
  Row,
  BottomButtons,
  DetailListItem,
} from '../components';
import data from '../data/data';

class Detail extends PureComponent {
  renderItem = ({ item, index }) => {
    return <DetailListItem item={item} delay={112 * index} />;
  };
  render() {
    const { item, startPosition } = this.props;

    return (
      <View style={styles.container}>
        <ListItem item={item} onPress={() => {}} />
        <FlatList
          data={item.items}
          keyExtractor={item => item.amount}
          renderItem={this.renderItem}
        />
        <BottomButtons />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  rowContainer: {
    alignItems: 'center',
  },
  titleText: {},
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
  vatText: {
    fontSize: 10,
    color: 'gray',
  },
});

export default Detail;
