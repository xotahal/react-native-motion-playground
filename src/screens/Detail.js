import React, { PureComponent } from 'react';
import { Animated, Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Toolbar, Row } from '../components';
import data from '../data/data';

class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Row style={styles.rowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <Text style={styles.amountText}>{item.amount}</Text>
        </Row>
        <Text style={styles.vatText}>
          {`${item.amount} X1 (Including VAT 10%)`}
        </Text>
      </View>
    );
  };
  render() {
    const { topValue } = this.state;
    const { item, startPosition } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.toolbarBackground} />
        <ListItem item={item} onPress={() => {}} />
        <FlatList
          data={item.items}
          keyExtractor={item => item.amount}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    // backgroundColor: 'blue',
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
