import React, { PureComponent } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

import { Row } from '../../components';
import translateAndOpacity from '../../animations/translateAndOpacity';

class DetailListItem extends PureComponent {
  render() {
    const { item, index } = this.props;

    return (
      <Animated.View style={styles.itemContainer}>
        <Row style={styles.rowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <Text style={styles.amountText}>{item.amount}</Text>
        </Row>
        <Text style={styles.vatText}>
          {`${item.amount} X1 (Including VAT 10%)`}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
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
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
  vatText: {
    fontSize: 10,
    color: 'gray',
  },
});

export default translateAndOpacity(DetailListItem);
