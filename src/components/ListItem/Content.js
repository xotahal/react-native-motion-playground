import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Row from '../Row';
import { getPlatformElevation } from '../../utils';

class Content extends PureComponent {
  render() {
    const { amount, date, isReceived } = this.props;

    return (
      <Row style={styles.container}>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Amount</Text>
          <Text style={styles.amountText}>{amount}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Date</Text>
          <Text>{date.format('LL')}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Status</Text>
          <Text>{isReceived ? 'Received' : 'Not received'}</Text>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  cellContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 10,
    color: 'gray',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
});

export default Content;
