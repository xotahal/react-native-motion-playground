import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Header from './Header';
import Content from './Content';
import { getPlatformElevation } from '../../utils';

class ListItem extends PureComponent {
  render() {
    const { item } = this.props;
    const { name, ...rest } = item;

    return (
      <View style={styles.container}>
        <Header name={name} />
        <Content {...rest} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    ...getPlatformElevation(4),
  },
});

export default ListItem;
